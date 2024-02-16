import { IEncryptionService, IUserService } from "../../../domain/services";
import { UserServiceImpl } from "../../services";
import { encryptionServiceFactory } from "./encryption.service.factory";

export const userServiceFactory = (): IUserService => {
  const encryptionService: IEncryptionService = encryptionServiceFactory();

  return new UserServiceImpl(encryptionService);
};
