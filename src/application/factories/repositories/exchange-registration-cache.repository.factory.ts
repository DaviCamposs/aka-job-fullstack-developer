import { IExchangeRegistrationCacheRepository } from "../../../domain/repositories";
import { ExchangeRegistrationCacheRepositoryImpl } from "../../../infrastructure/repositories";

export const exchangeRegistrationCacheRepositoryFactory = (): IExchangeRegistrationCacheRepository => {
    return new ExchangeRegistrationCacheRepositoryImpl()
}