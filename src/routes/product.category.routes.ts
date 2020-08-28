import { Router } from 'express';

import { getRepository } from 'typeorm';
import ProductCategory from '../models/ProductCategory';

const productCategoryRouter = Router();

productCategoryRouter.get('/', async (request, response) => {
  const productCategoryRepository = getRepository(ProductCategory);

  const categories = await productCategoryRepository.find();

  return response.json(categories);
});

export default productCategoryRouter;
