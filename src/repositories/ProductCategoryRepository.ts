import { getRepository, Repository } from 'typeorm';
import IProductCategoryRepository from '../interfaces/IProductCategoryRepository';

import ProductCategory from '../models/ProductCategory';

class ProductCategoryRepository implements IProductCategoryRepository {
  private ormRepository: Repository<ProductCategory>;

  constructor() {
    this.ormRepository = getRepository(ProductCategory);
  }

  public async list(): Promise<ProductCategory[]> {
    const ProductCategory = await this.ormRepository.find();

    return ProductCategory;
  }
}

export default ProductCategoryRepository;
