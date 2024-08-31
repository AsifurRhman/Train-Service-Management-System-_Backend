import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import * as trainService from './train.service.js';
import sendError from '../../utils/sendError.js';

export const createTrain = catchAsync(async (req, res) => {
  console.log(req.body, "req.body");
  const trainData = { ...req.body, createdBy: req.user.id };
   
  const train = await trainService.createTrain(trainData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Train created successfully',
    data: train,
  });
});

export const updateTrain = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const updatedTrain = await trainService.updateTrainById(trainId, req.body);
  if (!updatedTrain) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Train not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train updated successfully',
    data: updatedTrain,
  });
});

export const getTrain = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const train = await trainService.findTrainById(trainId);
  if (!train) {
    return sendError(res, httpStatus.NOT_FOUND, {
        message: 'train not found.',
      });
    }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train retrieved successfully',
    data: train,
  });
});

export const getAllTrains = catchAsync(async (req, res) => {
  const trains = await trainService.getAllTrains();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trains retrieved successfully',
    data: trains,
  });
});

export const deleteTrain = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const deletedTrain = await trainService.deleteTrainById(trainId);
  if (!deletedTrain) {
    return sendError(res, httpStatus.NOT_FOUND, {
        message: 'Train not found or maybe deleted.',
      });
    }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train deleted successfully',
    data: null,
  });
});

export const addTrainStop = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const stopData = req.body;
  const updatedTrain = await trainService.addTrainStop(trainId, stopData);
  if (!updatedTrain) {
      return sendError(res, httpStatus.NOT_FOUND, {
        message: 'Train not found .',
      });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train stop added successfully',
    data: updatedTrain,
  });
});

export const updateTrainStop = catchAsync(async (req, res) => {
  const { trainId, stopId } = req.params;
    const stopData = req.body;
    console.log(stopData);
  const updatedTrain = await trainService.updateTrainStop(trainId, stopId, stopData);
  if (!updatedTrain) {
    return sendError(res, httpStatus.NOT_FOUND, {
        message: 'Train or stop maybe not found.',
      });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train stop updated successfully',
    data: updatedTrain,
  });
});

export const getTrainSchedule = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const schedule = await trainService.getTrainSchedule(trainId);
  if (!schedule) {
    return sendError(res,httpStatus.NOT_FOUND, {
      message: 'Train schedule not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train schedule retrieved successfully',
    data: schedule,
  });
});