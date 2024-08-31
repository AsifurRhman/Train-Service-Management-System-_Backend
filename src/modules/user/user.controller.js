import bcrypt from 'bcrypt';
import { UserModel } from './user.model.js';

import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../../utils/catchAsync.js';
import sendError from '../../utils/sendError.js';
import sendResponse from '../../utils/sendResponse.js';
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById,

  updateUserById
} from './user.service.js';
import { generateToken, hashPassword } from './user.utils.js';
import { validateUserInput } from './user.validation.js';

export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, phone, image } = req.body;

  const validationError = validateUserInput(name, email, password);

  if (validationError) {
    return sendError(res, httpStatus.BAD_REQUEST, validationError);
  }

  const isUserRegistered = await findUserByEmail(email);
  if (isUserRegistered) {
    return sendError(res, httpStatus.BAD_REQUEST, {
      message: 'You already have an account.',
    });
  }


  const hashedPassword = hashPassword(password);
  const { createdUser } = await createUser({
    name,
    email,
    hashedPassword,
    phone,
   
    image,
  });

  const token = generateToken({ name, email });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  if (createdUser) {
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'You are ready to move in the site',
      data: null,
    });
  }

});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return sendError(res, httpStatus.NOT_FOUND, {
      message: 'This account does not exist.',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);


  if (!isPasswordValid ) {
    return sendError(res, httpStatus.UNAUTHORIZED, {
      message: 'Invalid password.',
    });
  }

  const token = generateToken({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});
export const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await findUserById(userId);
  if (!user) {
    return sendError(res, httpStatus.NOT_FOUND, {
      message: 'User not found or maybe deleted.',
    });
  }

  // Update the serial numbers of users with a higher serial
  const usersWithHigherSerial = await UserModel.find({ serial: { $gt: user.serial } });
  for (const userWithHigherSerial of usersWithHigherSerial) {
    await updateUserById(userWithHigherSerial._id, { serial: userWithHigherSerial.serial - 1 });
  }

  await deleteUserById(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: null,
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, phone, image} = req.body;

  const user = await findUserById(userId);
  if (!user) {
    return sendError(res, httpStatus.NOT_FOUND, {
      message: 'User not found.',
    });
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = hashPassword(password);
  if (phone) updateData.phone = phone;
  if (image) updateData.image = image;


  // Update the serial number if the user's serial is not the same as the last user's serial
  const lastUser = await UserModel.findOne({}, {}, { sort: { createdAt: -1 } });
  if (lastUser && user.serial !== lastUser.serial) {
    updateData.serial = lastUser.serial + 1;
  }

  const updatedUser = await updateUserById(userId, updateData);
  if (updatedUser) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: null,
    });
  }

});














