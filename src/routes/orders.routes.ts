import { Router } from 'express';
import GetOrdersByUserService from '../services/GetOrdersByUserService';
import ChangeOrderStatusService from '../services/ChangeOrderStatusService';

const ordersRouter = Router();

ordersRouter.get('/', async (request, response) => {
  const user_id = request.user.id;
  const getOrderByUser = new GetOrdersByUserService();

  const orders = await getOrderByUser.execute({
    user_id,
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
