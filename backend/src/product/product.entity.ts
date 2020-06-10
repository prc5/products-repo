import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  userId: string;

  @ManyToOne(
    type => User,
    user => user.products,
  )
  user: User;
}
