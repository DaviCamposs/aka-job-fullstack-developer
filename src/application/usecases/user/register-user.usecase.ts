import { IUserRepository } from "../../../domain/repositories";
import { IUserService } from "../../../domain/services";
import { IRegisterUserUseCase } from "../../../domain/usecases";

export class RegisterUserUseCaseImpl implements IRegisterUserUseCase {
  constructor(
    private readonly _userService: IUserService,
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(name: string, email: string, password: string): Promise<void> {
    const user = await this._userService.createUser(name, email, password);

    await this._userRepository.save(user);
  }
}
