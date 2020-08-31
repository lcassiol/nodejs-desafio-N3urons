import { Router } from 'express';
import { container } from 'tsyringe';

import ProductCategoryController from '../controllers/ProductCategoryController';

const productCategoryRouter = Router();
const productCategoryController = new ProductCategoryController();

productCategoryRouter.get('/', productCategoryController.index);

export default productCategoryRouter;
