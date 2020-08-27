import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import Stock from '../models/Stock';
import Subsidiary from '../models/Subsidiary';

interface IRequest {
  subsidiary_id: number;
  product_id: number;
  quantity: number;
}

class CreateOrUpdateStockService {
  public async execute({
    subsidiary_id,
    product_id,
    quantity,
  }: IRequest): Promise<Stock> {
    const stockRepository = getRepository(Stock);
    const subsidiaryRepository = getRepository(Subsidiary);
    const productRepository = getRepository(Product);

    const subsidiaryExists = await subsidiaryRepository.findOne({
      where: {
        id: subsidiary_id,
      },
    });

    if (!subsidiaryExists) {
      throw new AppError('Subsidiary does not exists');
    }

    const productExists = await productRepository.findOne({
      where: {
        id: product_id,
      },
    });

    if (!productExists) {
      throw new AppError('Product does not exists');
    }

    const productAlreadyInRepository = await stockRepository.findOne({
      where: {
        subsidiary_id,
        product_id,
      },
    });

    if (productAlreadyInRepository) {
      const updatedProductStock = Object.assign(productAlreadyInRepository, {
        quantity,
      });

      await stockRepository.save(updatedProductStock);

      return updatedProductStock;
    } else {
      const newProduct = stockRepository.create({
        product_id,
        quantity,
        subsidiary_id,
      });

      await stockRepository.save(newProduct);
      return newProduct;
    }
  }
}

export default CreateOrUpdateStockService;
