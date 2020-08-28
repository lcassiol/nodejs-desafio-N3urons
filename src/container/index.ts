import { container } from 'tsyringe';

import IUserRepository from '../interfaces/IUserRepository';
import UserRepository from '../repositories/UserRepository';

import IOrderRepository from '../interfaces/IOrderRepository';
import OrderRepository from '../repositories/OrderRepository';

import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';
import OrderStatusRepository from '../repositories/OrderStatusRepository';

import IClientRepository from '../interfaces/IClientRepository';
import ClientRepository from '../repositories/ClientRepository';

import IProductRepository from '../interfaces/IProductRepository';
import ProductRepository from '../repositories/ProductRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);

container.registerSingleton<IOrderStatusRepository>(
  'OrderStatusRepository',
  OrderStatusRepository,
);

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
