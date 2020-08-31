import { Router } from 'express';

import OrderController from '../controllers/OrderController';
import OrdersStatusController from '../controllers/OrdersStatusController';

const ordersRouter = Router();
const orderController = new OrderController();
const ordersStatusController = new OrdersStatusController();

ordersRouter.get('/', orderController.index);
ordersRouter.post('/', orderController.store);
ordersRouter.put('/:id', orderController.update);

ordersRouter.get('/status', ordersStatusController.index);

export default ordersRouter;
