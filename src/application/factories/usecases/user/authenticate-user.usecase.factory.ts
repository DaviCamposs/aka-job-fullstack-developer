import { IUserRepository } from "../../../../domain/repositories";
import {
  IAuthenticationService,
  IUserService,
} from "../../../../domain/services";
import { IAuthenticateUserUseCase } from "../../../../domain/usecases";
import { AuthenticateUserUseCaseImpl } from "../../../usecases";
import { userRepositoryFactory } from "../../repositories";
import { userServiceFactory } from "../../services";
import { authenticationServiceFactory } from "../../services/authentication.service.factory";

export const authenticateUserUseCaseFactory = (): IAuthenticateUserUseCase => {
  const userRepository: IUserRepository = userRepositoryFactory();
  const userService: IUserService = userServiceFactory();
  const authenticationService: IAuthenticationService =
    authenticationServiceFactory();

  return new AuthenticateUserUseCaseImpl(
    userRepository,
    userService,
    authenticationService
  );
};
