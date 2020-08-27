import { container } from 'tsyringe';

import IUserRepository from '../interfaces/IUserRepository';
import UserRepository from '../repositories/UserRepository';

import IOrderRepository from '../interfaces/IOrderRepository';
import OrderRepository from '../repositories/OrderRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
