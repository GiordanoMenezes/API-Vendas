import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.fetchAll);

productsRouter.get('/:id', productsController.fetchById);

productsRouter.post('/', productsController.create);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
