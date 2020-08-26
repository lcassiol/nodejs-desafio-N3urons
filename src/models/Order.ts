import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Subsidiary from './Subsidiary';
import Client from './Client';
import OrderStatus from './OrderStatus';
import User from './User';
import OrderProducts from './OrderProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  subtotal: number;

  @Column()
  discount: number;

  @Column()
  total: number;

  @Column()
  status_id: number;

  @ManyToOne(() => OrderStatus, { eager: true })
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @Column()
  subsidiary_id: number;

  @ManyToOne(() => Subsidiary)
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderProducts, orderProduct => orderProduct.order)
  order_products: OrderProducts[];
}

export default Order;
