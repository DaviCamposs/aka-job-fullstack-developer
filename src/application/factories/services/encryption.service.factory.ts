import { IEncryptionService } from "../../../domain/services";
import { EncryptionServiceImpl } from "../../../infrastructure/services";

export const encryptionServiceFactory = (): IEncryptionService => {
  return new EncryptionServiceImpl();
};
