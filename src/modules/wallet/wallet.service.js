
import { TransactionModel, WalletModel } from './wallet.model.js';


export const addFunds = async (userId, amount) => {
  const wallet = await WalletModel.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  );

  await TransactionModel.create({
    userId,
    type: 'CREDIT',
    amount,
    balance: wallet.balance
  });

  return wallet;
};

export const getBalance = async (userId) => {
  const wallet = await WalletModel.findOne({ userId });
  return wallet ? wallet.balance : null;
};

export const getTransactionHistory = async (userId) => {
  return TransactionModel.find({ userId }).sort({ createdAt: -1 });
};

export const deductFunds = async (userId, amount) => {
  const wallet = await WalletModel.findOne({ userId });
  if (!wallet || wallet.balance < amount) {
    throw new Error('Insufficient funds');
  }

  wallet.balance -= amount;
  await wallet.save();

  await TransactionModel.create({
    userId,
    type: 'DEBIT',
    amount,
    balance: wallet.balance
  });

  return wallet;
};