import bcrypt from "bcryptjs";
import { IEncryptionService } from "../../domain/services";

export class EncryptionServiceImpl implements IEncryptionService {
  compareValues(encryptedValue: string, value: string): boolean {
    return bcrypt.compareSync(value, encryptedValue);
  }
  encrypt(value: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(value, saltRounds);
  }
}
