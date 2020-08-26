import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_status')
class OrderStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default OrderStatus;
