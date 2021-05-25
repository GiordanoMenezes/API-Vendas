import { IValidator } from '@shared/validation/IValidator';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProductDTO } from '@modules/products/domain/models/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import NegocioException from '@shared/exceptions/NegocioException';

import { inject, injectable } from 'tsyringe';

@injectable()
class CreateProductService {
  private errormessages: string[] = [];

  constructor(
    @inject('DIProductsRepository') private productsRepository: IProductsRepository,
    @inject('DIValidator') private validator: IValidator,
  ) {}

  public async execute(irequest: ICreateProductDTO): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(irequest.name);
    if (productExists) {
      this.errormessages.push('There is already one product with this name');
    }

    const productSave = await this.productsRepository.create(irequest);

    // VALIDATION
    const validationErrors = await this.validator.validate(productSave);
    if (validationErrors && validationErrors.length > 0) {
      this.errormessages = this.errormessages.concat(validationErrors);
    }

    // RETURN EXCEPTION IF SOMETHING FAILED
    if (this.errormessages.length > 0 || !productSave) {
      throw new NegocioException(new Set<string>(this.errormessages), 400, undefined);
    }

    // DATABASE INSERT
    await this.productsRepository.save(productSave);

    return productSave;
  }
}

export default CreateProductService;
