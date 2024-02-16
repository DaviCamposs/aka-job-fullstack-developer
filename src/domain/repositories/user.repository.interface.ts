import { User } from "../entities";

export interface IUserRepository {
  save(user: User): Promise<void>;
}
