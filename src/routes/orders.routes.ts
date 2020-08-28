import { Router } from 'express';
import { container } from 'tsyringe';

import GetOrdersByUserService from '../services/GetOrdersByUserService';
import ChangeOrderStatusService from '../services/ChangeOrderStatusService';
import CreateOrderService from '../services/CreateOrderService';
import ListOrderStatusService from '../services/ListOrderStatusService';

const ordersRouter = Router();

ordersRouter.get('/', async (request, response) => {
  const user_id = request.user.id;
  const getOrderByUser = container.resolve(GetOrdersByUserService);

  const orders = await getOrderByUser.execute({
    user_id,
  });

  return response.json(orders);
});

ordersRouter.get('/status', async (request, response) => {
  const listOrderStatusService = container.resolve(ListOrderStatusService);

  const status = await listOrderStatusService.execute();

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

  const createOrderService = container.resolve(CreateOrderService);

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
  const changeOrderStatus = container.resolve(ChangeOrderStatusService);

  const order = await changeOrderStatus.execute({
    user_id,
    order_id: Number(id),
    status_id,
  });

  return response.json(order);
});

export default ordersRouter;
