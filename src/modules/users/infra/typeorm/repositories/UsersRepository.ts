import { ICreateUserDTO } from '@modules/users/domain/models/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/users/domain/models/IUpdateUserDTO';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<IUser[]> {
    const users = this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(createUserDTO: ICreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(createUserDTO);
    user.id = uuid();

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: IUser): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async preload(user: IUpdateUserDTO): Promise<IUser | undefined> {
    const newuser = await this.ormRepository.preload(user);

    return newuser;
  }
}
