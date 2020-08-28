import { Router } from 'express';
import { container } from 'tsyringe';
import CreateOrUpdateStockService from '../services/CreateOrUpdateStockService';
import GetStockProductsService from '../services/GetStockProductsService';

const stockRouter = Router();

stockRouter.post('/', async (request, response) => {
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
});

stockRouter.get('/', async (request, response) => {
  const { subsidiary_id } = request.query;
  const getStockProductService = container.resolve(GetStockProductsService);

  const stock = await getStockProductService.execute({
    subsidiary_id: Number(subsidiary_id),
  });

  return response.json(stock);
});

export default stockRouter;
