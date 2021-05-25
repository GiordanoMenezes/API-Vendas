import { IValidator } from '@shared/validation/IValidator';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { container } from 'tsyringe';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import APIVendasClassValidator from '@shared/infra/validation/APIVendasClassValidator';

container.registerSingleton<IProductsRepository>('DIProductsRepository', ProductsRepository);
container.registerSingleton<IUsersRepository>('DIUsersRepository', UsersRepository);
container.registerInstance<IValidator>('DIValidator', new APIVendasClassValidator());
