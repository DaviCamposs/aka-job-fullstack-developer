import { IExchangeRegistrationCacheRepository } from "../../../../domain/repositories";
import { IExchangeRegistrationCacheService } from "../../../../domain/services";
import { IStoreExchangeRegistrationDayHistoryUseCase } from "../../../../domain/usecases";
import { StoreExchangeRegistrationDayHistoryUseCaseImpl } from "../../../usecases";
import { exchangeRegistrationCacheRepositoryFactory } from "../../repositories";
import { exchangeRegistrationCacheServiceFactory } from "../../services";

export const storeExchangeRegistrationDayHistoryFactory =
  (): IStoreExchangeRegistrationDayHistoryUseCase => {
    const exchangeRegistrationCacheService: IExchangeRegistrationCacheService =
      exchangeRegistrationCacheServiceFactory();
    const exchangeRegistrationCacheRepository: IExchangeRegistrationCacheRepository =
      exchangeRegistrationCacheRepositoryFactory();

    return new StoreExchangeRegistrationDayHistoryUseCaseImpl(
      exchangeRegistrationCacheService,
      exchangeRegistrationCacheRepository
    );
  };
