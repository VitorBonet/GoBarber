import User from '../infra/typeorm/entities/User';
import ICreateUserDTOS from '../dtos/ICreateUserDTOS';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRespository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTOS): Promise<User>;
  save(user: User): Promise<User>;
}
