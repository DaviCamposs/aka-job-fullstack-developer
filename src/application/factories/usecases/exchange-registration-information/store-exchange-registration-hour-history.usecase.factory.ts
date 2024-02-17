import { IExchangeRegistrationCacheRepository } from "../../../../domain/repositories";
import { IExchangeRegistrationCacheService } from "../../../../domain/services";
import {
  IStoreExchangeRegistrationHourHistoryUseCase,
} from "../../../../domain/usecases";
import { StoreExchangeRegistrationHourHistoryUseCaseImpl } from "../../../usecases";
import { exchangeRegistrationCacheRepositoryFactory } from "../../repositories";
import { exchangeRegistrationCacheServiceFactory } from "../../services";

export const storeExchangeRegistrationHourHistoryFactory =
  (): IStoreExchangeRegistrationHourHistoryUseCase => {
    const exchangeRegistrationCacheService: IExchangeRegistrationCacheService =
      exchangeRegistrationCacheServiceFactory();
    const exchangeRegistrationCacheRepository: IExchangeRegistrationCacheRepository =
      exchangeRegistrationCacheRepositoryFactory();

    return new StoreExchangeRegistrationHourHistoryUseCaseImpl(
      exchangeRegistrationCacheService,
      exchangeRegistrationCacheRepository
    );
  };
