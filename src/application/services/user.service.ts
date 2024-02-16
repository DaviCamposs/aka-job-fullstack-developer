import { User } from "../../domain/entities";
import { DomainError, InvalidCredentialsError } from "../../domain/errors";
import { IUserRepository } from "../../domain/repositories";
import { IEncryptionService, IUserService } from "../../domain/services";

const MINIMUM_LENGTH_NAME = 2;
const MINIMUM_LENGTH_PASSWORD = 8;

export class UserServiceImpl implements IUserService {
  constructor(
    private readonly _encryptionService: IEncryptionService,
    private readonly _userRepository: IUserRepository
  ) {}

  authenticate(user: User, input: string): void {
    const isCredentialsValid = this._encryptionService.compareValues(
      user.password,
      input
    );

    if (!isCredentialsValid)
      throw new InvalidCredentialsError("Invalid Credentials");
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    if (name.length < MINIMUM_LENGTH_NAME)
      throw new DomainError("The name of user must be at least 2 characters");

    if (!this.isValidEmail(email))
      throw new DomainError("The email of user must be valid");

    if (password.length < MINIMUM_LENGTH_PASSWORD)
      throw new DomainError(
        "The password of user must be at least 8 characters"
      );

    const isEmailAlreadyRegistered = !!(await this._userRepository.findByEmail(
      email
    ));

    if (isEmailAlreadyRegistered)
      throw new DomainError("The email is already registered");

    const encryptedPassword = this._encryptionService.encrypt(password);

    return new User(name, email, encryptedPassword);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
