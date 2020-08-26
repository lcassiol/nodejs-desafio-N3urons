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

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @Column()
  subsidiary_id: number;

  @ManyToOne(() => Subsidiary)
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;

  @Column()
  client_id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

export default Order;
