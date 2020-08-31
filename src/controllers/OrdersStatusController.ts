import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrderStatusService from '../services/ListOrderStatusService';

export default class OrdersStatusController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrderStatusService = container.resolve(ListOrderStatusService);

    const status = await listOrderStatusService.execute();

    return response.json(status);
  }
}
