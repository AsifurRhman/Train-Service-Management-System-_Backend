import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import * as stationService from './station.service.js';
import sendError from '../../utils/sendError.js';

export const createStation = catchAsync(async (req, res) => {
    
    const stationData = { ...req.body, createdBy: req.user.id };
   
  const station = await stationService.createStation(stationData);
  console.log(station)
  if (!station.success) {
    return sendError(res, httpStatus.BAD_REQUEST, {
       message: station.message,
     });
   }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Station created successfully',
   
  });
});

export const updateStation = catchAsync(async (req, res) => {
  const { stationId } = req.params;
  const updatedStation = await stationService.updateStationById(stationId, req.body);
  if (!updatedStation) {
    return sendError(res,httpStatus.NOT_FOUND, {
      success: false,
      message: 'Station not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station updated successfully',
    data: updatedStation,
  });
});

export const getStation = catchAsync(async (req, res) => {
  const { stationId } = req.params;
  const station = await stationService.findStationById(stationId);
  if (!station) {
    return sendError(res, httpStatus.NOT_FOUND,{
      success: false,
      message: 'Station not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station retrieved successfully',
    data: station,
  });
});

export const getAllStations = catchAsync(async (req, res) => {
  const stations = await stationService.getAllStations();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stations retrieved successfully',
    data: stations,
  });
});

export const deleteStation = catchAsync(async (req, res) => {
  const { stationId } = req.params;
  const deletedStation = await stationService.deleteStationById(stationId);
  if (!deletedStation) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Station not found or data maybe deleted.',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station deleted successfully',
    data: null,
  });
});