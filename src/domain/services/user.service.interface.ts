import { User } from "../entities";

export interface IUserService {
  createUser(name: string, email: string, password: string): User;
}
