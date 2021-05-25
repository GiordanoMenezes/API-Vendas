import { IValidator } from '@shared/validation/IValidator';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateProductDTO } from '@modules/products/domain/models/IUpdateProductDTO';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import NegocioException from '@shared/exceptions/NegocioException';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateProductService {
  private errormessages: string[] = [];

  constructor(
    @inject('DIProductsRepository') private productsRepository: IProductsRepository,
    @inject('DIValidator') private validator: IValidator,
  ) {}

  public async execute(updateProductDTO: IUpdateProductDTO): Promise<IProduct> {
    const productUpdate = await this.productsRepository.preload(updateProductDTO);

    if (!productUpdate) {
      throw new NegocioException(new Set<string>(['Product selected for update does not exists!']), 404);
    }

    const nameExists = await this.productsRepository.findByName(updateProductDTO.name);

    if (nameExists && nameExists.id !== updateProductDTO.id) {
      this.errormessages.push('This name is already been used!');
    }

    // VALIDATION
    const validationErrors = await this.validator.validate(productUpdate);
    if (validationErrors && validationErrors.length > 0) {
      this.errormessages = this.errormessages.concat(validationErrors);
    }

    // RETURN EXCEPTION IF SOMETHING FAILED
    if (this.errormessages.length > 0 || !productUpdate) {
      throw new NegocioException(new Set<string>(this.errormessages), 400, undefined);
    }

    await this.productsRepository.save(productUpdate);

    return productUpdate;
  }
}

export default UpdateProductService;
