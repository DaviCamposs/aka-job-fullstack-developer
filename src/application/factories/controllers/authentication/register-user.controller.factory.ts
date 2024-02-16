import { IRegisterUserUseCase } from "../../../../domain/usecases";
import { RegisterUserController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { registerUserUseCaseFactory } from "../../usecases";

export const registerUserControllerFactory = (): Controller => {
  const registerUserUseCase: IRegisterUserUseCase =
    registerUserUseCaseFactory();

  return new RegisterUserController(registerUserUseCase);
};
