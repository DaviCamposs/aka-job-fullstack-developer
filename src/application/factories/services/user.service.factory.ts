import { IUserRepository } from "../../../domain/repositories";
import { IEncryptionService, IUserService } from "../../../domain/services";
import { UserServiceImpl } from "../../services";
import { userRepositoryFactory } from "../repositories";
import { encryptionServiceFactory } from "./encryption.service.factory";

export const userServiceFactory = (): IUserService => {
  const encryptionService: IEncryptionService = encryptionServiceFactory();
  const userRepository: IUserRepository = userRepositoryFactory()

  return new UserServiceImpl(encryptionService,userRepository);
};
