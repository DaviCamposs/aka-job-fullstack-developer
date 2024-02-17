import { IExchangeRegistrationRepository } from "../../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../../domain/services";
import { IGenerateExchangeRegistrationHistoryUseCase } from "../../../../domain/usecases";
import { GenerateExchangeRegistrationHistoryUseCaseImpl } from "../../../usecases";
import { exchangeRegistrationRepositoryFactory } from "../../repositories";
import { exchangeRegistrationServiceFactory } from "../../services";

export const generateExchangeRegistrationHistoryUseCaseFactory = (): IGenerateExchangeRegistrationHistoryUseCase => {
    
    const exchangeRegistrationHistoryRepository: IExchangeRegistrationRepository = exchangeRegistrationRepositoryFactory()
    const exchangeRegistrationService: IExchangeRegistrationService = exchangeRegistrationServiceFactory()
    
    return new GenerateExchangeRegistrationHistoryUseCaseImpl(exchangeRegistrationHistoryRepository,exchangeRegistrationService)
}