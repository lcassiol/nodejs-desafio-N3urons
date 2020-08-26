import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_status')
class ProductCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default ProductCategory;
