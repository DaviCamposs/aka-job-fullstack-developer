import { IExchangeRegistrationCacheRepository } from "../../../domain/repositories";
import { IExchangeRegistrationCacheService } from "../../../domain/services";
import { IExchangeRegistrationStatisticsByDay, IExchangeRegistrationStatisticsByHour } from "../../../domain/services/@types";
import { IStoreExchangeRegistrationDayHistoryUseCase, IStoreExchangeRegistrationHourHistoryUseCase } from "../../../domain/usecases";

export class StoreExchangeRegistrationDayHistoryUseCaseImpl
  implements IStoreExchangeRegistrationDayHistoryUseCase
{
  constructor(
    private readonly _exchangeRegistrationCacheService: IExchangeRegistrationCacheService,
    private readonly _exchangeRegistrationCacheRepository: IExchangeRegistrationCacheRepository
  ) {}

  async execute(data: IExchangeRegistrationStatisticsByDay[]): Promise<void> {
    const formattedInput =
      this._exchangeRegistrationCacheService.convertExchangeRegistrationToDayCache(
        data
      );

    await this._exchangeRegistrationCacheRepository.save(formattedInput);
  }
}
