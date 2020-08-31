import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetProductsService from '../services/GetProductsService';
import CreateProductService from '../services/CreateProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getProductsService = container.resolve(GetProductsService);
    const products = await getProductsService.execute();

    return response.json(products);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, description, price, category_id } = request.body;
    const createProductService = container.resolve(CreateProductService);

    const newProduct = await createProductService.execute({
      name,
      description,
      price,
      category_id,
    });

    return response.json(newProduct);
  }
}
