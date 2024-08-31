import express from 'express';
import { addFunds, getTransactionHistory, getWalletBalance } from './wallet.controller.js';
import { adminMiddleware } from '../../middleware/auth.js';

const router = express.Router();

router.post('/add-funds', adminMiddleware('user'), addFunds);
router.get('/balance/:userId', adminMiddleware('user'), getWalletBalance);
router.get('/transactions/:userId', adminMiddleware('user'), getTransactionHistory);

export default router;