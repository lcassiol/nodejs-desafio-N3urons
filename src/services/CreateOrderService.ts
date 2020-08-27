import { getRepository, In } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';
import OrderProducts from '../models/OrderProducts';
import OrderStatus from '../models/OrderStatus';
import Stock from '../models/Stock';

interface IRequest {
  subsidiary_id: number;
  subtotal: number;
  user_id: string;
  client_id: string;
  discount: number;
  products: {
    product_id: number;
    quantity: number;
    total: number;
  }[];
}

class CreateOrderService {
  public async execute({
    subsidiary_id,
    subtotal,
    user_id,
    client_id,
    discount,
    products,
  }: IRequest): Promise<Order> {
    const orderRepository = getRepository(Order);
    const orderProductsRepository = getRepository(OrderProducts);
    const orderStatusRepository = getRepository(OrderStatus);
    const stockRepository = getRepository(Stock);

    const orderStatusProcessing = await orderStatusRepository.findOne({
      where: {
        name: 'Processing',
      },
    });

    //check if subsidiary exists

    //check stock
    const productIds = products.map(product => product.product_id);
    const productInStock = await stockRepository.find({
      where: {
        subsidiary_id,
        product_id: In(productIds),
      },
    });

    console.log('Product in stock');
    console.log(productInStock);
    const updatedStock: Stock[] = [];

    productInStock.forEach(productStock => {
      const productIndex = products.findIndex(
        product => product.product_id === productStock.product_id,
      );

      if (productStock.quantity >= products[productIndex].quantity) {
        productStock.quantity -= products[productIndex].quantity;
        updatedStock.push(productStock);
      } else {
        throw new AppError('Product ' + productStock.id + ' Stock unavailable');
      }
    });

    // updated stock
    await stockRepository.save(updatedStock);

    //check cliente id
    //calc total, discount, subtotal

    const newOrder = orderRepository.create({
      client_id,
      total: subtotal - discount,
      discount,
      subtotal,
      subsidiary_id,
      status_id: orderStatusProcessing.id,
      user_id,
    });

    await orderRepository.save(newOrder);

    //insert on table order_products the products
    const orderProductsArray: OrderProducts[] = [];
    products.forEach(product => {
      const orderProduct = orderProductsRepository.create({
        order_id: newOrder.id,
        product_id: product.product_id,
        quantity: product.quantity,
        total: product.total,
      });

      orderProductsArray.push(orderProduct);
    });

    await orderProductsRepository.save(orderProductsArray);

    return newOrder;
  }
}

export default CreateOrderService;
