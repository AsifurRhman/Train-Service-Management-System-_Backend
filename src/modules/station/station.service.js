import sendError from "../../utils/sendError.js";
import { StationModel } from "./station.model.js";

export const createStation = async (stationData) => {

    const existingStation = await StationModel.findOne({ name: stationData.name });
  if (existingStation) {
    return {
      success: false,
      message: 'A station with this name already exists.'
    }
        
  }
  

  const create = StationModel.create(stationData);
  return {success:true,create}
  };

export const updateStationById = async (id, updateData) => {
  return StationModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const findStationById = async (id) => {
  return StationModel.findById(id);
};

export const getAllStations = async () => {
  return StationModel.find();
};

export const deleteStationById = async (id) => {
  return StationModel.findByIdAndDelete(id);
};