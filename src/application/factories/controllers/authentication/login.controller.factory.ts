import { IAuthenticateUserUseCase } from "../../../../domain/usecases";
import { LoginController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { authenticateUserUseCaseFactory } from "../../usecases";

export const loginControllerFactory = (): Controller => {
  const authenticateUserUseCase: IAuthenticateUserUseCase =
    authenticateUserUseCaseFactory();

  return new LoginController(authenticateUserUseCase);
};
