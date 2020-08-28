import { getRepository, Repository, In } from 'typeorm';
import IProductRepository from '../interfaces/IProductRepository';

import Product from '../models/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    description,
    category_id,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const newProduct = this.ormRepository.create({
      name,
      description,
      category_id,
      price,
    });

    await this.ormRepository.save(newProduct);

    return newProduct;
  }

  public async list(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: number): Promise<Product | undefined> {
    const findProducts = await this.ormRepository.findOne({
      where: { id },
    });

    return findProducts;
  }

  public async findByIds(ids: number[]): Promise<Product[]> {
    const findProducts = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    return findProducts;
  }
}

export default ProductRepository;
