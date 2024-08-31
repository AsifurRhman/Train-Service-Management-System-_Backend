import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import sendError from '../../utils/sendError.js';
import * as walletService from './wallet.service.js';

export const addFunds = catchAsync(async (req, res) => {
  const { userId, amount } = req.body;
  const updatedWallet = await walletService.addFunds(userId, amount);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Funds added successfully',
    data: updatedWallet,
  });
});

export const getWalletBalance = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const balance = await walletService.getBalance(userId);
  if (!balance) {
    return sendError(res, httpStatus.NOT_FOUND,  {
        message: 'wallet not found',
      });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet balance retrieved successfully',
    data: { balance },
  });
});

export const getTransactionHistory = catchAsync(async (req, res) => {
  const { userId } = req.params;
    const transactions = await walletService.getTransactionHistory(userId);
    if (!transactions) {
        return sendError(res, httpStatus.NOT_FOUND,  {
            message: 'There is no transaction history',
          });

     }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction history retrieved successfully',
    data: transactions,
  });
});