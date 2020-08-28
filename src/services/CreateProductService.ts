import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import IProductRepository from '../interfaces/IProductRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  category_id: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
    category_id,
  }: IRequest): Promise<Product> {
    const newProduct = await this.productRepository.create({
      name,
      description,
      price,
      category_id,
    });

    return newProduct;
  }
}

export default CreateProductService;
