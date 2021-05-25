import { IUpdateProductDTO } from '@modules/products/domain/models/IUpdateProductDTO';
import { ICreateProductDTO } from '@modules/products/domain/models/ICreateProductDTO';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<IProduct[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async create(createProductDTO: ICreateProductDTO): Promise<IProduct> {
    const product = this.ormRepository.create(createProductDTO);
    product.id = uuid();

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async preload(product: IUpdateProductDTO): Promise<IProduct | undefined> {
    const newproduct = await this.ormRepository.preload(product);

    return newproduct;
  }
}
