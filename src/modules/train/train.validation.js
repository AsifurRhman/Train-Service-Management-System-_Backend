import { z } from 'zod';

export const createTrainValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required!',
    invalid_type_error: 'Name must be a string',
  }),
  number: z.string({
    required_error: 'Train number is required!',
    invalid_type_error: 'Train number must be a string',
  }),
  type: z.string({
    required_error: 'Train type is required!',
    invalid_type_error: 'Train type must be a string',
  }),
  capacity: z.number({
    required_error: 'Capacity is required!',
    invalid_type_error: 'Capacity must be a number',
  }),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
});

export const trainStopValidationSchema = z.object({
  stationId: z.string({
    required_error: 'Station ID is required!',
    invalid_type_error: 'Station ID must be a string',
  }),
  arrivalTime: z.string().datetime({
    message: 'Invalid arrival time format. Use ISO 8601 format.',
  }),
  departureTime: z.string().datetime({
    message: 'Invalid departure time format. Use ISO 8601 format.',
  }),
});