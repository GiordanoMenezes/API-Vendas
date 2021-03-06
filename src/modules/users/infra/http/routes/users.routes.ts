import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.fetchAll);

usersRouter.get('/:id', usersController.fetchById);

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
