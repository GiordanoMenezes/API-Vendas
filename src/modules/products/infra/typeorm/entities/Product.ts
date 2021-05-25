import { IProduct } from '@modules/products/domain/models/IProduct';
import { IsPositive, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @MinLength(5, { message: 'Name must have at least 5 characters.' })
  @Column()
  name: string;

  @IsPositive()
  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
