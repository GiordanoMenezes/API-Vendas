import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FetchAllUsersService {
  constructor(@inject('DIUsersRepository') private usersRepository: IUsersRepository) {}
  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default FetchAllUsersService;
