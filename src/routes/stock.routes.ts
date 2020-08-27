import { Router } from 'express';
import CreateOrUpdateStockService from '../services/CreateOrUpdateStockService';

const stockRouter = Router();

stockRouter.post('/', async (request, response) => {
  const { product_id, quantity, subsidiary_id } = request.body;
  const createOrUpdateStockService = new CreateOrUpdateStockService();

  const stock = await createOrUpdateStockService.execute({
    product_id,
    quantity,
    subsidiary_id,
  });

  return response.json(stock);
});

export default stockRouter;
