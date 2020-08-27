import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByLogin(login: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
