import bcrypt from "bcryptjs";
import { IEncryptionService } from "../../domain/services";

export class EncryptionServiceImpl implements IEncryptionService {
  encrypt(value: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(value, saltRounds);
  }
}
