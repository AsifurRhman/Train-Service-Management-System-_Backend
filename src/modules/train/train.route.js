import express from 'express';


import { addTrainStop, createTrain, deleteTrain, getAllTrains, getTrain, getTrainSchedule, updateTrain, updateTrainStop } from './train.controller.js';

import { adminMiddleware } from '../../middleware/auth.js';

const router = express.Router();


router.post('/create', adminMiddleware('admin'), createTrain);
router.get('/all-train',  getAllTrains);
router.get('/single-train/:trainId',getTrain);
router.put('/update/:trainId', adminMiddleware('admin'), updateTrain);
router.delete('/delete/:trainId', adminMiddleware('admin'), deleteTrain);

router.post('/:trainId/stops', adminMiddleware('admin'), addTrainStop);
router.put('/:trainId/stops/:stopId', adminMiddleware('admin'), updateTrainStop);
router.get('/:trainId/schedule',  getTrainSchedule);

export default router;