import { Router } from 'express';
import { container } from 'tsyringe';
import ensureSellerUser from '../middlewares/ensureSellerUser';

import CreateProductService from '../services/CreateProductService';
import GetProductsService from '../services/GetProductsService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const getProductsService = container.resolve(GetProductsService);
  const products = await getProductsService.execute();

  return response.json(products);
});

productsRouter.post('/', ensureSellerUser, async (request, response) => {
  const { name, description, price, category_id } = request.body;
  const createProductService = container.resolve(CreateProductService);

  const newProduct = await createProductService.execute({
    name,
    description,
    price,
    category_id,
  });

  return response.json(newProduct);
});

export default productsRouter;
