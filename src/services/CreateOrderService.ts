import { getRepository, In } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';
import OrderProducts from '../models/OrderProducts';
import OrderStatus from '../models/OrderStatus';
import Stock from '../models/Stock';
import Product from '../models/Product';

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

class CreateOrderService {
  public async execute({
    subsidiary_id,
    user_id,
    client_id,
    discount,
    products,
  }: IRequest): Promise<Order> {
    const orderRepository = getRepository(Order);
    const orderProductsRepository = getRepository(OrderProducts);
    const orderStatusRepository = getRepository(OrderStatus);
    const stockRepository = getRepository(Stock);
    const productRepository = getRepository(Product);

    const orderStatusProcessing = await orderStatusRepository.findOne({
      where: {
        name: 'Processing',
      },
    });

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
