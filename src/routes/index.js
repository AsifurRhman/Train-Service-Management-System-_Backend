import express from 'express';
import userRoutes from '../modules/user/user.route.js';
import stationRoutes from '../modules/station/station.route.js';
const router = express.Router();

router.use("/api/user", userRoutes);
router.use("/api/station", stationRoutes);

export default router;
