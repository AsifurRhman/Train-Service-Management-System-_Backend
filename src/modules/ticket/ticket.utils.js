// checking the ticket status active or used
import { TicketModel } from './ticket.model.js';


const formatDateWithOffset = (date) => {
    // Convert to UTC ISO string
    const isoString = date.toISOString(); 
  
    // Replace 'Z' with '+00:00' to match the desired format
    const formattedDate = isoString.replace('Z', '+00:00');
  
    return formattedDate;
  };




export const updateTicketStatus = async () => {
    const now = new Date();
    console.log(now,"now")
    const formattedDate = formatDateWithOffset(now);
  try {
    const result = await TicketModel.updateMany(
      { departureTime: { $lte: formattedDate }, status: 'ACTIVE' },
      { $set: { status: 'USED' } }
    );

    console.log(`Updated ${result.modifiedCount} tickets to USED status.`);
  } catch (error) {
    console.error('Error updating ticket status:', error);
  }
}