import { UserToken } from "../../entities";

export interface IAuthenticateUserUseCase {
  execute(email: string, password: string): Promise<UserToken>;
}
