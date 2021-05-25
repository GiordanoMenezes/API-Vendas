import { IUpdateProductDTO } from '@modules/products/domain/models/IUpdateProductDTO';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProductDTO } from '../models/ICreateProductDTO';

export interface IProductsRepository {
  findAll(): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  create(createProductDTO: ICreateProductDTO): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  preload(product: IUpdateProductDTO): Promise<IProduct | undefined>;
  remove(product: IProduct): Promise<void>;
}
