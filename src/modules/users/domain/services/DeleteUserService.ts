import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import NegocioException from '@shared/exceptions/NegocioException';
import { IRequestId } from '@shared/models/IRequestId';
import { injectable, inject } from 'tsyringe';

@injectable()
class DeleteUserService {
  constructor(@inject('DIUsersRepository') private usersRepository: IUsersRepository) {}
  public async execute({ id }: IRequestId): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NegocioException(new Set<string>(['User not found.']), 404);
    }

    await this.usersRepository.remove(user);
  }
}

export default DeleteUserService;
