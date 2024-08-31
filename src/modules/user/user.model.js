import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },

  phone: { type: String },
  image: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },

}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);