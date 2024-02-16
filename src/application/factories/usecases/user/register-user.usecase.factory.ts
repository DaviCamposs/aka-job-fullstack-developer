import { IUserRepository } from "../../../../domain/repositories";
import { IUserService } from "../../../../domain/services";
import { IRegisterUserUseCase } from "../../../../domain/usecases";
import { RegisterUserUseCaseImpl } from "../../../usecases";
import { userRepositoryFactory } from "../../repositories";
import { userServiceFactory } from "../../services";

export const registerUserUseCaseFactory = (): IRegisterUserUseCase => {
    const userService: IUserService = userServiceFactory()
    const userRepository: IUserRepository = userRepositoryFactory()
    
    return new RegisterUserUseCaseImpl(userService,userRepository)
}