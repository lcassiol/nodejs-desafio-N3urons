import { Router } from 'express';
import { container } from 'tsyringe';
import ensureSellerUser from '../middlewares/ensureSellerUser';

import CreateProductService from '../services/CreateProductService';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/', productController.index);
productsRouter.post('/', ensureSellerUser, productController.store);

export default productsRouter;
