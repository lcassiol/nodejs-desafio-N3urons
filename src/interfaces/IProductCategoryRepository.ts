import ProductCategory from '../models/ProductCategory';

export default interface IProductCategoryRepository {
  list(): Promise<ProductCategory[]>;
}
