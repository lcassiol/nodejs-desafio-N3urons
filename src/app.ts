import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import * as cors from 'cors';
import Consumer from './queueConsumer/ConsumerConfirmPayment';
import routes from './routes';
import AppError from './errors/AppError';

import './database';
import './container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

Consumer();

export default app;
