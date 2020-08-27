import { getRepository } from 'typeorm';

import Product from '../models/Product';

class GetProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getRepository(Product);

    const products = productRepository.find();

    return products;
  }
}

export default GetProductsService;
