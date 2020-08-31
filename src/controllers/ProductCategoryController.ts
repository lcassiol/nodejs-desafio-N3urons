import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductCategoryService from '../services/ListProductCategoryService';

export default class ProductCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductCategory = container.resolve(ListProductCategoryService);

    const categories = await listProductCategory.execute();

    return response.json(categories);
  }
}
