import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Stock from '../models/Stock';
import Subsidiary from '../models/Subsidiary';
import IProductRepository from '../interfaces/IProductRepository';
import IStockRepository from '../interfaces/IStockRepository';

interface IRequest {
  subsidiary_id: number;
  product_id: number;
  quantity: number;
}

@injectable()
class CreateOrUpdateStockService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({
    subsidiary_id,
    product_id,
    quantity,
  }: IRequest): Promise<Stock> {
    const subsidiaryRepository = getRepository(Subsidiary);

    const subsidiaryExists = await subsidiaryRepository.findOne({
      where: {
        id: subsidiary_id,
      },
    });

    if (!subsidiaryExists) {
      throw new AppError('Subsidiary does not exists');
    }

    const productExists = await this.productRepository.findById(product_id);

    if (!productExists) {
      throw new AppError('Product does not exists');
    }

    const productAlreadyInRepository = await this.stockRepository.findByProductId(
      {
        subsidiary_id,
        product_id,
      },
    );

    if (productAlreadyInRepository) {
      const updatedProductStock = Object.assign(productAlreadyInRepository, {
        quantity,
      });

      await this.stockRepository.update(updatedProductStock);

      return updatedProductStock;
    } else {
      const newProduct = await this.stockRepository.create({
        product_id,
        quantity,
        subsidiary_id,
      });

      return newProduct;
    }
  }
}

export default CreateOrUpdateStockService;
