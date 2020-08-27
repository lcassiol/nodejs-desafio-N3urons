import { injectable, inject } from 'tsyringe';

import { getRepository, In } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';
import OrderProducts from '../models/OrderProducts';
import OrderStatus from '../models/OrderStatus';
import Stock from '../models/Stock';
import Product from '../models/Product';
import User from '../models/User';
import IOrderRepository from '../interfaces/IOrderRepository';
import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';

interface IRequest {
  subsidiary_id: number;
  subtotal: number;
  user_id: string;
  client_id: string;
  discount: number;
  products: {
    product_id: number;
    quantity: number;
  }[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderStatusRepository')
    private orderStatusRepository: IOrderStatusRepository,
  ) {}

  public async execute({
    subsidiary_id,
    user_id,
    client_id,
    discount,
    products,
  }: IRequest): Promise<Order> {
    const orderProductsRepository = getRepository(OrderProducts);

    const stockRepository = getRepository(Stock);
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user.isSeller && user.client_id !== client_id) {
      throw new AppError('Only sellers can create order to other clients');
    }

    const orderStatusProcessing = await this.orderStatusRepository.findByName(
      'Processing',
    );

    //check stock
    const productIds = products.map(product => product.product_id);
    const findProducts = await productRepository.find({
      where: {
        id: In(productIds),
      },
    });

    const productInStock = await stockRepository.find({
      where: {
        subsidiary_id,
        product_id: In(productIds),
      },
    });

    console.log('Product in stock');
    console.log(productInStock);
    const updatedStock: Stock[] = [];
    let subtotal = 0;

    if (productInStock.length === 0) {
      throw new AppError('Stock unavailable');
    }

    products.forEach(product => {
      const realProduct = findProducts.find(
        findProduct => findProduct.id === product.product_id,
      );
      const stockIndex = productInStock.findIndex(
        stock => stock.product_id === product.product_id,
      );

      if (stockIndex < 0) {
        throw new AppError(
          'Product name: ' +
            realProduct.name +
            ' id: ' +
            product.product_id +
            ' Stock unavailable',
        );
      }

      const tempStock = productInStock[stockIndex];

      if (tempStock.quantity >= product.quantity) {
        tempStock.quantity -= product.quantity;
        subtotal += realProduct.price * product.quantity;
        updatedStock.push(tempStock);
      } else {
        throw new AppError(
          'Product name: ' +
            realProduct.name +
            ' id:' +
            product.product_id +
            ' Stock unavailable',
        );
      }
    });

    //check cliente id
    //calc total, discount, subtotal
    let total = subtotal - discount;
    total = total < 0 ? 0 : total;

    const newOrder = await this.orderRepository.create({
      client_id,
      total,
      discount,
      subtotal,
      subsidiary_id,
      status_id: orderStatusProcessing.id,
      user_id,
    });

    //insert on table order_products the products
    const orderProductsArray: OrderProducts[] = [];
    products.forEach(product => {
      const findProductIndex = findProducts.findIndex(
        dbProduct => dbProduct.id === product.product_id,
      );
      const orderProduct = orderProductsRepository.create({
        order_id: newOrder.id,
        product_id: product.product_id,
        quantity: product.quantity,
        total: findProducts[findProductIndex].price * product.quantity,
      });

      orderProductsArray.push(orderProduct);
    });

    await orderProductsRepository.save(orderProductsArray);
    // update stock
    await stockRepository.save(updatedStock);

    return newOrder;
  }
}

export default CreateOrderService;
