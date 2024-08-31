import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainId: {
    type: Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'USED', 'CANCELLED'],
    default: 'ACTIVE'
  }
}, {
  timestamps: true
});



export const TicketModel = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);