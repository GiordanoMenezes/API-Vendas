import { container } from 'tsyringe';
import CreateProductService from '@modules/products/domain/services/CreateProductService';
import { Request, Response } from 'express';
import FetchAllProductsService from '@modules/products/domain/services/FetchAllProductsService';
import FetchProductByIdService from '@modules/products/domain/services/FetchProductByIdService';
import UpdateProductService from '@modules/products/domain/services/UpdateProductService';
import DeleteProductService from '@modules/products/domain/services/DeleteProductService';

export default class ProductsController {
  public async fetchAll(request: Request, response: Response): Promise<Response> {
    const fetchAllProducts = container.resolve(FetchAllProductsService);

    const products = await fetchAllProducts.execute();

    return response.json(products);
  }

  public async fetchById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const fetchProduct = container.resolve(FetchProductByIdService);

    const product = await fetchProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
