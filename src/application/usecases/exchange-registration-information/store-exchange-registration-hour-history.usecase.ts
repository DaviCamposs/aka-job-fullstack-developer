import { IExchangeRegistrationCacheRepository } from "../../../domain/repositories";
import { IExchangeRegistrationCacheService } from "../../../domain/services";
import { IExchangeRegistrationStatisticsByHour } from "../../../domain/services/@types";
import { IStoreExchangeRegistrationHourHistoryUseCase } from "../../../domain/usecases";

export class StoreExchangeRegistrationHourHistoryUseCaseImpl
  implements IStoreExchangeRegistrationHourHistoryUseCase
{
  constructor(
    private readonly _exchangeRegistrationCacheService: IExchangeRegistrationCacheService,
    private readonly _exchangeRegistrationCacheRepository: IExchangeRegistrationCacheRepository
  ) {}

  async execute(data: IExchangeRegistrationStatisticsByHour[]): Promise<void> {
    const formattedInput =
      this._exchangeRegistrationCacheService.convertExchangeRegistrationToHourCache(
        data
      );

    await this._exchangeRegistrationCacheRepository.save(formattedInput);
  }
}
