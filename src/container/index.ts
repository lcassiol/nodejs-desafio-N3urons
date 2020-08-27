import { container } from 'tsyringe';

import IUserRepository from '../interfaces/IUserRepository';
import UserRepository from '../repositories/UserRepository';

import IOrderRepository from '../interfaces/IOrderRepository';
import OrderRepository from '../repositories/OrderRepository';

import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';
import OrderStatusRepository from '../repositories/OrderStatusRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);

container.registerSingleton<IOrderStatusRepository>(
  'OrderStatusRepository',
  OrderStatusRepository,
);
