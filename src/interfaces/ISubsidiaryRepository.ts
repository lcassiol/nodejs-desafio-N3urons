import Subsidiary from '../models/Subsidiary';

export default interface ISubsidiaryRepository {
  findById(id: number): Promise<Subsidiary | undefined>;
}
