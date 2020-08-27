import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Subsidiary from './Subsidiary';
import Product from './Product';

@Entity('stock')
class Stock {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @Column()
  subsidiary_id: number;

  @ManyToOne(() => Subsidiary)
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default Stock;
