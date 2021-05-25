import { IValidator } from '@shared/validation/IValidator';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUpdateUserDTO } from '@modules/users/domain/models/IUpdateUserDTO';
import NegocioException from '@shared/exceptions/NegocioException';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateUserService {
  private errormessages: string[] = [];

  constructor(
    @inject('DIUsersRepository') private usersRepository: IUsersRepository,
    @inject('DIValidator') private validator: IValidator,
  ) {}

  public async execute(updateUserDTO: IUpdateUserDTO): Promise<IUser> {
    const userUpdate = await this.usersRepository.preload(updateUserDTO);

    if (!userUpdate) {
      throw new NegocioException(new Set<string>(['User selected for update does not exists!']), 404);
    }

    const emailExists = await this.usersRepository.findByEmail(updateUserDTO.email);

    if (emailExists && emailExists.id !== updateUserDTO.id) {
      this.errormessages.push('This email is already been used!');
    }

    // VALIDATION
    const validationErrors = await this.validator.validate(userUpdate);
    if (validationErrors && validationErrors.length > 0) {
      this.errormessages = this.errormessages.concat(validationErrors);
    }

    // RETURN EXCEPTION IF SOMETHING FAILED
    if (this.errormessages.length > 0 || !userUpdate) {
      throw new NegocioException(new Set<string>(this.errormessages), 400, undefined);
    }

    await this.usersRepository.save(userUpdate);

    return userUpdate;
  }
}

export default UpdateUserService;
