export interface IEncryptionService {
  encrypt(value: string): string;
  compareValues(value: string, encryptedValue: string): boolean
}
