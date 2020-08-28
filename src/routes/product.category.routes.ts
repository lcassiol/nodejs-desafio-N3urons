import { Router } from 'express';
import { container } from 'tsyringe';

import ListProductCategory from '../services/ListProductCategoryService';

const productCategoryRouter = Router();

productCategoryRouter.get('/', async (request, response) => {
  const listProductCategory = container.resolve(ListProductCategory);

  const categories = await listProductCategory.execute();

  return response.json(categories);
});

export default productCategoryRouter;
