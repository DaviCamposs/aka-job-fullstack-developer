import { UserToken } from "../../../domain/entities";
import { InvalidCredentialsError } from "../../../domain/errors";
import { IUserRepository } from "../../../domain/repositories";
import { IAuthenticationService, IUserService } from "../../../domain/services";
import { IAuthenticateUserUseCase } from "../../../domain/usecases";

export class AuthenticateUserUseCaseImpl implements IAuthenticateUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userService: IUserService,
    private readonly _authenticationService: IAuthenticationService
  ) {}

  async execute(email: string, password: string): Promise<UserToken> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError("Invalid Credentials");

    this._userService.authenticate(user, password);

    const token = this._authenticationService.generateToken(user);

    return new UserToken(user.id, user.name, user.email, token);
  }
}
