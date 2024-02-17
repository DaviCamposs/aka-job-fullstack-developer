import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { ExchangeRegistrationRepositoryImpl } from "../../../infrastructure/repositories/exchange-registration.repository.interface";

export const exchangeRegistrationRepositoryFactory = (): IExchangeRegistrationRepository => {
    return new ExchangeRegistrationRepositoryImpl()
}