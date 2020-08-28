import { getRepository, Repository } from 'typeorm';
import ISubsidiaryRepository from '../interfaces/ISubsidiaryRepository';

import Subsidiary from '../models/Subsidiary';

class SubsidiaryRepository implements ISubsidiaryRepository {
  private ormRepository: Repository<Subsidiary>;

  constructor() {
    this.ormRepository = getRepository(Subsidiary);
  }

  public async findById(id: number): Promise<Subsidiary | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return order;
  }
}

export default SubsidiaryRepository;
