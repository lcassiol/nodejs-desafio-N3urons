import { getRepository, Repository, In } from 'typeorm';
import IStockRepository from '../interfaces/IStockRepository';

import Stock from '../models/Stock';
import ISearchStockByProductIdsDTO from '../dtos/ISearchStockByProductIdsDTO';
import ICreateStockDTO from '../dtos/ICreateStockDTO';
import ISearchStockByProductIdDTO from '../dtos/ISearchStockByProductIdDTO copy';

class StockRepository implements IStockRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async create({
    product_id,
    quantity,
    subsidiary_id,
  }: ICreateStockDTO): Promise<Stock> {
    const newStock = this.ormRepository.create({
      product_id,
      quantity,
      subsidiary_id,
    });

    await this.ormRepository.save(newStock);

    return newStock;
  }

  public async update(data: ICreateStockDTO): Promise<Stock> {
    const updatedStock = await this.ormRepository.save(data);

    return updatedStock;
  }

  public async bulkUpdate(data: ICreateStockDTO[]) {
    const stocks = await this.ormRepository.save(data);

    return stocks;
  }

  public async findByProductsIds({
    productIds,
    subsidiary_id,
  }: ISearchStockByProductIdsDTO): Promise<Stock[]> {
    const stocks = await this.ormRepository.find({
      where: {
        subsidiary_id,
        product_id: In(productIds),
      },
    });

    return stocks;
  }

  public async findByProductId({
    product_id,
    subsidiary_id,
  }: ISearchStockByProductIdDTO): Promise<Stock> {
    const stock = await this.ormRepository.findOne({
      where: {
        product_id,
        subsidiary_id,
      },
    });

    return stock;
  }

  public async findBySubsidiary(subsidiary_id): Promise<Stock[]> {
    const stocks = await this.ormRepository.find({
      where: {
        subsidiary_id,
      },
    });

    return stocks;
  }
}

export default StockRepository;
