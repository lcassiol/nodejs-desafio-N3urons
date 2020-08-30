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

import IStockRepository from '../interfaces/IStockRepository';
import StockRepository from '../repositories/StockRepository';

import IOrderProductsRepository from '../interfaces/IOrderProductsRepository';
import OrderProductsRepository from '../repositories/OrderProductsRepository';

import IProductCategoryRepository from '../interfaces/IProductCategoryRepository';
import ProductCategoryRepository from '../repositories/ProductCategoryRepository';

import ISubsidiaryRepository from '../interfaces/ISubsidiaryRepository';
import SubsidiaryRepository from '../repositories/SubsidiaryRepository';

import ISendMail from '../interfaces/ISendMail';
import SendMail from '../utils/SendMail/SendMailService';

import IQueueServer from '../interfaces/IQueueServer';
import RabbitMQServer from '../utils/RabbitMQ/RabbitMQServer';

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

container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository,
);

container.registerSingleton<IOrderProductsRepository>(
  'OrderProductsRepository',
  OrderProductsRepository,
);

container.registerSingleton<IProductCategoryRepository>(
  'ProductCategoryRepository',
  ProductCategoryRepository,
);

container.registerSingleton<ISubsidiaryRepository>(
  'SubsidiaryRepository',
  SubsidiaryRepository,
);

container.registerSingleton<ISendMail>('SendMailService', SendMail);

container.registerSingleton<IQueueServer>('QueueServer', RabbitMQServer);
