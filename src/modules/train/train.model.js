import mongoose, { Schema } from "mongoose";

const StopSchema = new Schema({
  stationId: { type: Schema.Types.ObjectId, ref: 'Station', required: true },
  arrivalTime: { type: Date, required: true },
  departureTime: { type: Date, required: true },
});

const TrainSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  schedule: [StopSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const TrainModel = mongoose.models.Train || mongoose.model('Train', TrainSchema);