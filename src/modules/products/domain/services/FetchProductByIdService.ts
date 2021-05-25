import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import NegocioException from '@shared/exceptions/NegocioException';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { IRequestId } from '@shared/models/IRequestId';

@injectable()
class FetchProductByIdService {
  constructor(@inject('DIProductsRepository') private productsRepository: IProductsRepository) {}
  public async execute({ id }: IRequestId): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NegocioException(new Set<string>(['Product not found.']), 404);
    }

    return product;
  }
}

export default FetchProductByIdService;
