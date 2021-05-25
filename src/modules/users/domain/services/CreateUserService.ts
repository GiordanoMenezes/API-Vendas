import { IValidator } from '@shared/validation/IValidator';
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUserDTO } from '@modules/users/domain/models/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import NegocioException from '@shared/exceptions/NegocioException';

import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
  private errormessages: string[] = [];

  constructor(
    @inject('DIUsersRepository') private usersRepository: IUsersRepository,
    @inject('DIValidator') private validator: IValidator,
  ) {}

  public async execute(irequest: ICreateUserDTO): Promise<IUser> {
    const userExists = await this.usersRepository.findByEmail(irequest.email);
    if (userExists) {
      this.errormessages.push('There is already one user with this email.');
    }

    const userSave = await this.usersRepository.create(irequest);

    // VALIDATION
    const validationErrors = await this.validator.validate(userSave);
    if (validationErrors && validationErrors.length > 0) {
      this.errormessages = this.errormessages.concat(validationErrors);
    }

    // RETURN EXCEPTION IF SOMETHING FAILED
    if (this.errormessages.length > 0 || !userSave) {
      throw new NegocioException(new Set<string>(this.errormessages), 400, undefined);
    }

    // DATABASE INSERT
    await this.usersRepository.save(userSave);

    return userSave;
  }
}

export default CreateUserService;
