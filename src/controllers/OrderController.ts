import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetOrdersByUserService from '../services/GetOrdersByUserService';
import CreateOrderService from '../services/CreateOrderService';
import ChangeOrderStatusService from '../services/ChangeOrderStatusService';

export default class OrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const getOrderByUser = container.resolve(GetOrdersByUserService);

    const orders = await getOrderByUser.execute({
      user_id,
    });

    return response.json(orders);
  }

  public async store(request: Request, response: Response): Promise<Response> {
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
  }

  public async update(request: Request, response: Response): Promise<Response> {
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
  }
}
