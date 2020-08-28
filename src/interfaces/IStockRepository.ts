import Stock from '../models/Stock';
import ICreateStockDTO from '../dtos/ICreateStockDTO';
import ISearchStockByProductIdDTO from '../dtos/ISearchStockByProductIdDTO copy';
import ISearchStockByProductIdsDTO from '../dtos/ISearchStockByProductIdsDTO';

export default interface IStockRepository {
  create(data: ICreateStockDTO): Promise<Stock>;
  update(data: ICreateStockDTO): Promise<Stock>;
  findBySubsidiary(subsidiary: number): Promise<Stock[]>;
  findByProductId(data: ISearchStockByProductIdDTO): Promise<Stock | undefined>;
  findByProductsIds(data: ISearchStockByProductIdsDTO): Promise<Stock[]>;
  bulkUpdate(data: ICreateStockDTO[]): Promise<Stock[]>;
}
