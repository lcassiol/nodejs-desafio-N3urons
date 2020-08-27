import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import Stock from '../models/Stock';
import Subsidiary from '../models/Subsidiary';

interface IRequest {
  subsidiary_id: number;
}

class GetStockProductsService {
  public async execute({ subsidiary_id }: IRequest): Promise<Stock[]> {
    const stockRepository = getRepository(Stock);
    const subsidiaryRepository = getRepository(Subsidiary);

    const subsidiaryExist = await subsidiaryRepository.findOne({
      where: {
        id: subsidiary_id,
      },
    });

    if (!subsidiaryExist) {
      throw new AppError('Subsidiary invalid');
    }

    const stockProducts = stockRepository.find({
      where: {
        subsidiary_id,
      },
    });

    return stockProducts;
  }
}

export default GetStockProductsService;
