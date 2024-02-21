import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../domain/services";
import {
  IExchangeRegistrationStatisticsByDay,
  IExchangeRegistrationStatisticsByHour,
} from "../../../domain/services/@types";
import { IGenerateExchangeRegistrationHistoryUseCase, IStoreExchangeRegistrationDayHistoryUseCase, IStoreExchangeRegistrationHourHistoryUseCase } from "../../../domain/usecases";

export class GenerateExchangeRegistrationHistoryUseCaseImpl
  implements IGenerateExchangeRegistrationHistoryUseCase
{
  constructor(
    private readonly _exchangeRegistrationHistoryRepository: IExchangeRegistrationRepository,
    private readonly _exchangeRegistrationService: IExchangeRegistrationService,
    private readonly _storeExchangeRegistrationHourHistoryUseCase: IStoreExchangeRegistrationHourHistoryUseCase,
    private readonly _storeExchangeRegistrationDayHistoryUseCase: IStoreExchangeRegistrationDayHistoryUseCase,
  ) {}

  async execute(
    acronym: string,
    day: string | undefined,
    month: string,
    year: string
  ): Promise<
    | IExchangeRegistrationStatisticsByDay[]
    | IExchangeRegistrationStatisticsByHour[]
  > {
    const exchangeRegistrationResults =
      await this._exchangeRegistrationHistoryRepository.find(
        acronym,
        day,
        month,
        year
      );

    const groupedByHour =
      this._exchangeRegistrationService.calculateStatisticsByHour(
        exchangeRegistrationResults
      );

    const groupedByDay =
      this._exchangeRegistrationService.calculateStatisticsByDay(groupedByHour);

    

    await this._storeExchangeRegistrationHourHistoryUseCase.execute(groupedByHour)
    await this._storeExchangeRegistrationDayHistoryUseCase.execute(groupedByDay)


    return day !== undefined ? groupedByHour : groupedByDay;
  }
}
