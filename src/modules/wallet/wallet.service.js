import { TransactionModel, WalletModel } from './wallet.model.js';

export const addFunds = async (userId, amount) => {
  amount = Number(amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Invalid amount');
  }

  const wallet = await WalletModel.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true, runValidators: true }
  );

  await TransactionModel.create({
    userId,
    type: 'CREDIT',
    amount,
    balance: wallet.balance
  });

  return wallet;
};

export const deductFunds = async (userId, amount) => {
  amount = Number(amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Invalid amount');
  }

  const wallet = await WalletModel.findOne({ userId });
  if (!wallet || wallet.balance < amount) {
    throw new Error('Insufficient funds');
  }

  wallet.balance -= amount;
  await wallet.save({ runValidators: true });

  await TransactionModel.create({
    userId,
    type: 'DEBIT',
    amount,
    balance: wallet.balance
  });

  return wallet;
};

export const getBalance = async (userId) => {
  const wallet = await WalletModel.findOne({ userId });
  return wallet ? wallet.balance : 0;
};