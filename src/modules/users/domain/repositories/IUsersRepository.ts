import { ICreateUserDTO } from '@modules/users/domain/models/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/users/domain/models/IUpdateUserDTO';
import { IUser } from '@modules/users/domain/models/IUser';

export interface IUsersRepository {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | undefined>;
  findByName(name: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(createUserDTO: ICreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  preload(user: IUpdateUserDTO): Promise<IUser | undefined>;
  remove(user: IUser): Promise<void>;
}
