import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrUpdateStockService from '../services/CreateOrUpdateStockService';
import GetStockProductsService from '../services/GetStockProductsService';

export default class StockController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { product_id, quantity, subsidiary_id } = request.body;
    const createOrUpdateStockService = container.resolve(
      CreateOrUpdateStockService,
    );

    const stock = await createOrUpdateStockService.execute({
      product_id,
      quantity,
      subsidiary_id,
    });

    return response.json(stock);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { subsidiary_id } = request.query;
    const getStockProductService = container.resolve(GetStockProductsService);

    const stock = await getStockProductService.execute({
      subsidiary_id: Number(subsidiary_id),
    });

    return response.json(stock);
  }
}
