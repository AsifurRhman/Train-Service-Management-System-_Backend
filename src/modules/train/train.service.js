import { TrainModel } from './train.model.js';

export const createTrain = async (trainData) => {
  const train = new TrainModel(trainData);
  return await train.save();
};

export const updateTrainById = async (trainId, updateData) => {
  return await TrainModel.findByIdAndUpdate(trainId, updateData, { new: true });
};

export const findTrainById = async (trainId) => {
  return await TrainModel.findById(trainId);
};

export const getAllTrains = async () => {
  return await TrainModel.find();
};

export const deleteTrainById = async (trainId) => {
  return await TrainModel.findByIdAndDelete(trainId);
};

export const addTrainStop = async (trainId, stopData) => {
  return await TrainModel.findByIdAndUpdate(
    trainId,
    { $push: { schedule: stopData } },
    { new: true }
  );
};

export const updateTrainStop = async (trainId, stopId, stopData) => {
  return await TrainModel.findOneAndUpdate(
    { _id: trainId, 'schedule._id': stopId },
    { $set: { 'schedule.$': stopData } },
    { new: true }
  );
};

export const getTrainSchedule = async (trainId) => {
  const train = await TrainModel.findById(trainId).populate('schedule.stationId');
  return train ? train.schedule : null;
};