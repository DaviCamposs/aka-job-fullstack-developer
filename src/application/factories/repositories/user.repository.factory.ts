import { IUserRepository } from "../../../domain/repositories";
import { UserRepositoryImpl } from "../../../infrastructure/repositories";

export const userRepositoryFactory = (): IUserRepository => {
    return new UserRepositoryImpl()
}