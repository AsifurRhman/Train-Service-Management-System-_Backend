import express from 'express';
import { purchaseTicket, getUserTickets, cancelTicket } from './ticket.controller.js';
import { adminMiddleware } from '../../middleware/auth.js';

const router = express.Router();

router.post('/purchase-ticket', adminMiddleware('user'), purchaseTicket);
router.get('/user/:userId', adminMiddleware('user'), getUserTickets);
router.post('/cancel/:ticketId', adminMiddleware('user'), cancelTicket);

export default router;