import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from '../product/product.entity';

@Entity()
@Unique(['login'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ select: false })
  salt: string;

  @OneToMany(
    type => Product,
    product => product.user,
  )
  products: Product[];

  async validatePassword(
    password: string,
    userPassword: string,
    salt: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === userPassword;
  }
}
