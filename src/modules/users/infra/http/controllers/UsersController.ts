import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/domain/services/CreateUserService';
import FetchAllUsersService from '@modules/users/domain/services/FetchAllUsersService';
import FetchUserByIdService from '@modules/users/domain/services/FetchUserByIdService';
import UpdateUserService from '@modules/users/domain/services/UpdateUserService';
import DeleteUserService from '@modules/users/domain/services/DeleteUserService';

export default class UsersController {
  public async fetchAll(request: Request, response: Response): Promise<Response> {
    const fetchAllUsers = container.resolve(FetchAllUsersService);

    const users = await fetchAllUsers.execute();

    return response.json(users);
  }

  public async fetchById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const fetchUser = container.resolve(FetchUserByIdService);

    const user = await fetchUser.execute({ id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userRequest = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(userRequest);

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id });

    return response.json([]);
  }
}
