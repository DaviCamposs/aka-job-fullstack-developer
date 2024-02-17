import { IGenerateExchangeRegistrationHistoryUseCase } from "../../../../domain/usecases";
import { GetExchangeHistoryController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { generateExchangeRegistrationHistoryUseCaseFactory } from "../../usecases";

export const getExchangeHistoryControllerFactory = (): Controller => {
    const generateExchangeRegistrationHistoryUseCase: IGenerateExchangeRegistrationHistoryUseCase = generateExchangeRegistrationHistoryUseCaseFactory()
    
    return new GetExchangeHistoryController(generateExchangeRegistrationHistoryUseCase)
}