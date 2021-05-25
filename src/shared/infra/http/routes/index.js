import usersRouter from '@modules/users/infra/http/routes/Users.routes';
import { Router } from 'express';
import productsRouter from 'src/modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
