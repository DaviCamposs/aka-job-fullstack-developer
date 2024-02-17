import { ExchangeRegistration } from "../entities";
import { IExchangeRegistrationStatisticsByDay, IExchangeRegistrationStatisticsByHour } from "./@types";

export interface IExchangeRegistrationService {
  retrieveExchangeValues(
    currencyPair: string[]
  ): Promise<ExchangeRegistration[]>;

  calculateStatisticsByHour(input: ExchangeRegistration[]): IExchangeRegistrationStatisticsByHour[]

  calculateStatisticsByDay(input: IExchangeRegistrationStatisticsByHour[]): IExchangeRegistrationStatisticsByDay[]

}
