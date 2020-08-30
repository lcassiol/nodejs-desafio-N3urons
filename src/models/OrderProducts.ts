import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Subsidiary from './Subsidiary';
import Client from './Client';
import OrderStatus from './OrderStatus';
import Order from './Order';
import Product from './Product';

@Entity('order_products')
class OrderProducts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  order_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  product_id: number;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  total: number;
}

export default OrderProducts;
