import { container } from 'tsyringe';
import { Request, Response } from 'express';

import PayOrderService from '../services/PayOrderService';

export default class PaymentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { order_id, card_number, card_validate } = request.body;
    const payOrderService = container.resolve(PayOrderService);

    await payOrderService.execute({
      order_id,
      card_number,
      card_validate,
    });

    return response.status(204).send();
  }
}
