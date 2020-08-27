import { Router } from 'express';
import { getRepository } from 'typeorm';

import GetOrdersByUserService from '../services/GetOrdersByUserService';
import ChangeOrderStatusService from '../services/ChangeOrderStatusService';
import CreateOrderService from '../services/CreateOrderService';
import OrderStatus from '../models/OrderStatus';

const ordersRouter = Router();

ordersRouter.get('/', async (request, response) => {
  const user_id = request.user.id;
  const getOrderByUser = new GetOrdersByUserService();

  const orders = await getOrderByUser.execute({
    user_id,
  });

  return response.json(orders);
});

ordersRouter.get('/status', async (request, response) => {
  const statusRepository = getRepository(OrderStatus);
  const status = await statusRepository.find();

  return response.json(status);
});

ordersRouter.post('/', async (request, response) => {
  const user_id = request.user.id;
  const {
    client_id,
    discount,
    products,
    subsidiary_id,
    subtotal,
  } = request.body;

  const createOrderService = new CreateOrderService();

  const orders = await createOrderService.execute({
    user_id,
    client_id,
    discount,
    products,
    subsidiary_id,
    subtotal,
  });

  return response.json(orders);
});

ordersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { status_id } = request.body;
  const user_id = request.user.id;
  const changeOrderStatus = new ChangeOrderStatusService();

  const order = await changeOrderStatus.execute({
    user_id,
    order_id: Number(id),
    status_id,
  });

  return response.json(order);
});

export default ordersRouter;
