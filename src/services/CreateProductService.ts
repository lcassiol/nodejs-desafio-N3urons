import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Product from '../models/Product';

interface IRequest {
  name: string;
  description: string;
  price: number;
  category_id: number;
}

class CreateProductService {
  public async execute({
    name,
    description,
    price,
    category_id,
  }: IRequest): Promise<Product> {
    const productRepository = getRepository(Product);

    const newProduct = productRepository.create({
      name,
      description,
      price,
      category_id,
    });

    await productRepository.save(newProduct);

    return newProduct;
  }
}

export default CreateProductService;
