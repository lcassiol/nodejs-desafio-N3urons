import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';

import Stock from '../models/Stock';
import Subsidiary from '../models/Subsidiary';
import IStockRepository from '../interfaces/IStockRepository';

interface IRequest {
  subsidiary_id: number;
}

@injectable()
class GetStockProductsService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({ subsidiary_id }: IRequest): Promise<Stock[]> {
    const subsidiaryRepository = getRepository(Subsidiary);

    const subsidiaryExist = await subsidiaryRepository.findOne({
      where: {
        id: subsidiary_id,
      },
    });

    if (!subsidiaryExist) {
      throw new AppError('Subsidiary invalid');
    }

    const stockProducts = this.stockRepository.findBySubsidiary(subsidiary_id);

    return stockProducts;
  }
}

export default GetStockProductsService;
