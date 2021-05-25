import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '@modules/products/domain/models/IProduct';

@injectable()
class FetchAllProductsService {
  constructor(@inject('DIProductsRepository') private productsRepository: IProductsRepository) {}
  public async execute(): Promise<IProduct[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default FetchAllProductsService;
