import { Router } from 'express';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.post('/', async (request, response) => {
  const { name, description, price, category_id } = request.body;
  const createProductService = new CreateProductService();

  const newProduct = await createProductService.execute({
    name,
    description,
    price,
    category_id,
  });

  return response.json(newProduct);
});

export default productsRouter;
