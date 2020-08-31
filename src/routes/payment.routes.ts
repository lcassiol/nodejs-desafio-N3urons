import { Router } from 'express';

import PaymentController from '../controllers/PaymentController';

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post('/', paymentController.store);

export default paymentRouter;
