import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';

import IProductCategoryRepository from '../interfaces/IProductCategoryRepository';
import ProductCategory from '../models/ProductCategory';

@injectable()
class ListProductCategoryService {
  constructor(
    @inject('ProductCategoryRepository')
    private productCategoryRepository: IProductCategoryRepository,
  ) {}

  public async execute(): Promise<ProductCategory[]> {
    const productCategories = await this.productCategoryRepository.list();

    return productCategories;
  }
}

export default ListProductCategoryService;
