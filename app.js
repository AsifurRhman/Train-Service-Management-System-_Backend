import dotenv from 'dotenv';
import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import router from './src/routes/index.js';
import cron from 'node-cron';
import globalErrorHandler from './src/middleware/globalErrorHandler.js';
import notFoundRoute from './src/middleware/notFoundRoute.js';
import { updateTicketStatus } from './src/modules/ticket/ticket.utils.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Routes
app.use(router);

// Add a route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Run the ticket status update every min
cron.schedule('* * * * *', () => {
  console.log('Running ticket status update...');
  updateTicketStatus().catch((err) =>
    console.error('Error updating ticket status:', err)
  );
});

app.use('*', notFoundRoute);
app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
