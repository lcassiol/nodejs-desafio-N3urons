import { Router } from 'express';
import { container } from 'tsyringe';
import CreateOrUpdateStockService from '../services/CreateOrUpdateStockService';
import GetStockProductsService from '../services/GetStockProductsService';

import StockController from '../controllers/StockController';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.post('/', stockController.store);
stockRouter.get('/', stockController.index);

export default stockRouter;
