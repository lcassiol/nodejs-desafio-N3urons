import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import ProductCategory from './ProductCategory';

@Entity('order_status')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category_id: number;

  @ManyToOne(() => ProductCategory, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;
}

export default Product;
