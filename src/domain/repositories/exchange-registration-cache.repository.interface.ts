import { ExchangeRegistrationCache } from "../entities";

export interface IExchangeRegistrationCacheRepository {
    save(data: ExchangeRegistrationCache[]): Promise<void>
}