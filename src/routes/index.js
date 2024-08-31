import express from 'express';
import userRoutes from '../modules/user/user.route.js';
import stationRoutes from '../modules/station/station.route.js';
import trainRoutes from '../modules/train/train.route.js'
import walletRoutes from '../modules/wallet/wallet.route.js'
import ticketRoutes from '../modules/ticket/ticket.route.js'
const router = express.Router();

router.use("/api/user", userRoutes);
router.use("/api/station", stationRoutes);
router.use("/api/train", trainRoutes);
router.use("/api/wallet", walletRoutes);
router.use('/api/ticket', ticketRoutes);
export default router;
