import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import sendError from '../../utils/sendError.js';
import * as ticketService from './ticket.service.js';

export const purchaseTicket = catchAsync(async (req, res) => {
  const { userId, trainId, from, to, departureTime, price } = req.body;
  
    const ticket = await ticketService.purchaseTicket(userId, trainId, from, to, departureTime, price);
    console.log(ticket,"ticket")
    if (!ticket.success) {
     return sendError(res, httpStatus.BAD_REQUEST, {
        message: ticket.message,
      });
    }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Ticket purchased successfully',
    data: ticket,
  });
});

export const getUserTickets = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const tickets = await ticketService.getTicketsByUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User tickets retrieved successfully',
    data: tickets,
  });
});

export const cancelTicket = catchAsync(async (req, res) => {
  const { ticketId } = req.params;
  const { userId } = req.body;
  const cancelledTicket = await ticketService.cancelTicket(ticketId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket cancelled successfully',
    data: cancelledTicket,
  });
});
