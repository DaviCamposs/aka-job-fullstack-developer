import { IExchangeRegistrationCacheService } from "../../../domain/services";
import { ExchangeRegistrationCacheServiceImpl } from "../../services";

export const exchangeRegistrationCacheServiceFactory =
  (): IExchangeRegistrationCacheService => {
    return new ExchangeRegistrationCacheServiceImpl();
  };
