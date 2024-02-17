import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { ExchangeRegistrationRepositoryImpl } from "../../../infrastructure/repositories/exchange-registration.repository";

export const exchangeRegistrationRepositoryFactory = (): IExchangeRegistrationRepository => {
    return new ExchangeRegistrationRepositoryImpl()
}