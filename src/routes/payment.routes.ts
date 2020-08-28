import { Router } from 'express';
import { container } from 'tsyringe';
import PayOrderService from '../services/PayOrderService';

const clientsRouter = Router();

clientsRouter.post('/', async (request, response) => {
  const { order_id, card_number, card_validate } = request.body;
  const payOrderService = container.resolve(PayOrderService);

  await payOrderService.execute({
    order_id,
    card_number,
    card_validate,
  });

  return response.status(204);
});

export default clientsRouter;
