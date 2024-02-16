import { User } from "../entities";

export interface IUserService {
  createUser(name: string, email: string, password: string): Promise<User>;
  authenticate(user: User , input: string): void
}
