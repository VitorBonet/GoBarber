import User from '../infra/typeorm/entities/User';
import ICreateUserDTOS from '../dtos/ICreateUserDTOS';

export default interface IUsersRespository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTOS): Promise<User>;
  save(user: User): Promise<User>;
}
