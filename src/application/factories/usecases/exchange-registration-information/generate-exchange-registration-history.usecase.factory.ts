import { IExchangeRegistrationRepository } from "../../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../../domain/services";
import { IGenerateExchangeRegistrationHistoryUseCase, IStoreExchangeRegistrationDayHistoryUseCase, IStoreExchangeRegistrationHourHistoryUseCase } from "../../../../domain/usecases";
import { GenerateExchangeRegistrationHistoryUseCaseImpl } from "../../../usecases";
import { exchangeRegistrationRepositoryFactory } from "../../repositories";
import { exchangeRegistrationServiceFactory } from "../../services";
import { storeExchangeRegistrationDayHistoryFactory } from "./store-exchange-registration-day-history.usecase.factory";
import { storeExchangeRegistrationHourHistoryFactory } from "./store-exchange-registration-hour-history.usecase.factory";

export const generateExchangeRegistrationHistoryUseCaseFactory = (): IGenerateExchangeRegistrationHistoryUseCase => {
    
    const exchangeRegistrationHistoryRepository: IExchangeRegistrationRepository = exchangeRegistrationRepositoryFactory()
    const exchangeRegistrationService: IExchangeRegistrationService = exchangeRegistrationServiceFactory()
    const storeExchangeRegistrationHourHistoryUseCase: IStoreExchangeRegistrationHourHistoryUseCase = storeExchangeRegistrationHourHistoryFactory()
    const storeExchangeRegistrationDayHistoryUseCase: IStoreExchangeRegistrationDayHistoryUseCase = storeExchangeRegistrationDayHistoryFactory()
    
    return new GenerateExchangeRegistrationHistoryUseCaseImpl(exchangeRegistrationHistoryRepository,exchangeRegistrationService,storeExchangeRegistrationHourHistoryUseCase,storeExchangeRegistrationDayHistoryUseCase)
}