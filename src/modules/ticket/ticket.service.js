

import { addFunds, deductFunds, getBalance } from '../wallet/wallet.service.js';
import { TicketModel } from './ticket.model.js';


export const purchaseTicket = async (userId, trainId, from, to, departureTime, price) => {
    try {
      // Ensure departureTime is a Date object
      if (!(departureTime instanceof Date)) {
        departureTime = new Date(departureTime);
      }
  
      // Construct the query to count existing tickets for the same user, train, and departure time
      const query = {
        userId,
        trainId,
        from,
        to,
        departureTime,
        status: 'ACTIVE'
      };
  
      console.log('Query:', query);
  
      // Count how many tickets the user already has for this train and departure time
      const ticketCount = await TicketModel.countDocuments(query);
      console.log('Existing Ticket Count:', ticketCount);
  
      // If the user already has 5 tickets, throw an error
      if (ticketCount >= 5) {
        throw new Error('Your purchase is full.');
      }
  
      // Check if the user has sufficient balance
      const balance = await getBalance(userId);
      if (balance < price) {
        throw new Error('Insufficient funds');
      }
  console.log(balance,"balance")
      // Create the new ticket
      const newTicket = { userId, trainId, from, to, departureTime, price };
      console.log('New Ticket Data:', newTicket);
      const ticket = await TicketModel.create(newTicket);
  
      // Deduct funds from the user's wallet
      await deductFunds(userId, price);
  
      return ticket;
    } catch (error) {
      console.error('Error in purchaseTicket:', error.message);
  
      
    }
  };
  
  


export const getTicketsByUser = async (userId) => {
  return TicketModel.find({ userId });
};

export const cancelTicket = async (ticketId, userId) => {
  const ticket = await TicketModel.findOne({ _id: ticketId, userId });
  if (!ticket) {
    throw new Error('Ticket not found');
  }

  if (ticket.status !== 'ACTIVE') {
    throw new Error('Ticket is not active');
  }

  ticket.status = 'CANCELLED';
  await ticket.save();

  // Refund the ticket price to the user's wallet
  await addFunds(userId, ticket.price);

  return ticket;
};
