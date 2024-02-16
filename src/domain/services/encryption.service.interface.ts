export interface IEncryptionService {
  encrypt(value: string): string;
  compareValues(encryptedValue: string, value: string): boolean
}
