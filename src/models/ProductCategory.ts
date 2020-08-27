import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_category')
class ProductCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default ProductCategory;
