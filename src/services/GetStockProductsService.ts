import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';

import Stock from '../models/Stock';

import IStockRepository from '../interfaces/IStockRepository';
import ISubsidiaryRepository from '../interfaces/ISubsidiaryRepository';

interface IRequest {
  subsidiary_id: number;
}

@injectable()
class GetStockProductsService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('SubsidiaryRepository')
    private subsidiaryRepository: ISubsidiaryRepository,
  ) {}

  public async execute({ subsidiary_id }: IRequest): Promise<Stock[]> {
    const subsidiaryExist = await this.subsidiaryRepository.findById(
      subsidiary_id,
    );

    if (!subsidiaryExist) {
      throw new AppError('Subsidiary invalid');
    }

    const stockProducts = this.stockRepository.findBySubsidiary(subsidiary_id);

    return stockProducts;
  }
}

export default GetStockProductsService;
