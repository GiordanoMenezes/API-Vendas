import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import NegocioException from '@shared/exceptions/NegocioException';
import { IRequestId } from '@shared/models/IRequestId';
import { injectable, inject } from 'tsyringe';

@injectable()
class DeleteProductService {
  constructor(@inject('DIProductsRepository') private productsRepository: IProductsRepository) {}
  public async execute({ id }: IRequestId): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NegocioException(new Set<string>(['Product not found.']), 404);
    }

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
