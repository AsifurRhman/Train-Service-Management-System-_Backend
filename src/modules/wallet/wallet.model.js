// models/wallet.model.js
import mongoose, { Schema } from 'mongoose';

const walletSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   
  },
  
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

export const WalletModel = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);






const transactionSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    description: {
      type: String
    }
  }, {
    timestamps: true
  });
  
  export const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
  