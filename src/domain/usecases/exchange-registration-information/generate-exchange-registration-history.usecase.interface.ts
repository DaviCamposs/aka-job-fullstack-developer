import { IExchangeRegistrationStatisticsByDay, IExchangeRegistrationStatisticsByHour } from "../../services/@types";

export interface IGenerateExchangeRegistrationHistoryUseCase {
  execute(
    acronym: string,
    day: string | undefined,
    month: string,
    year: string
  ): Promise<IExchangeRegistrationStatisticsByDay[] | IExchangeRegistrationStatisticsByHour[]>;
}
