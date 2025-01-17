import { User } from "../entities";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User|null>
}
