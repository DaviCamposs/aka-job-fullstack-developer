import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../domain/services";
import {
  IExchangeRegistrationStatisticsByDay,
  IExchangeRegistrationStatisticsByHour,
} from "../../../domain/services/@types";
import { IGenerateExchangeRegistrationHistoryUseCase } from "../../../domain/usecases";

export class GenerateExchangeRegistrationHistoryUseCaseImpl
  implements IGenerateExchangeRegistrationHistoryUseCase
{
  constructor(
    private readonly _exchangeRegistrationHistoryRepository: IExchangeRegistrationRepository,
    private readonly _exchangeRegistrationService: IExchangeRegistrationService
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

    // TODO: Save in cache

    return day !== undefined ? groupedByHour : groupedByDay;
  }
}
