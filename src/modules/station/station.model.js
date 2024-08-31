import mongoose, { Schema } from "mongoose";

const StationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  lastMaintenance: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const StationModel = mongoose.models.Station || mongoose.model('Station', StationSchema);