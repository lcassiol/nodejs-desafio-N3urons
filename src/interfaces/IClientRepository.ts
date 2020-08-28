import Client from '../models/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
}
