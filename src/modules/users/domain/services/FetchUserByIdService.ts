import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import NegocioException from '@shared/exceptions/NegocioException';
import { IRequestId } from '@shared/models/IRequestId';

@injectable()
class FetchUserByIdService {
  constructor(@inject('DIUsersRepository') private usersRepository: IUsersRepository) {}
  public async execute({ id }: IRequestId): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NegocioException(new Set<string>(['User not found.']), 404);
    }

    return user;
  }
}

export default FetchUserByIdService;
