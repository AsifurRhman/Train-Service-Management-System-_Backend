import express from 'express';
import { adminMiddleware } from '../../middleware/auth.js';

import {
  createStation,
  updateStation,
  getStation,
  getAllStations,
  deleteStation,
} from './station.controller.js';



const router = express.Router();

router.post(
  '/create',
  adminMiddleware('admin'),
  createStation
);

router.put(
  '/update/:stationId',
  adminMiddleware('admin'),
  
  updateStation
);

router.get('/station-information/:stationId', getStation);
router.get('/all-station-information', getAllStations);

router.delete(
  '/:stationId',
  adminMiddleware('admin'),
  deleteStation
);

export default router;