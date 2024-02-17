import { ExchangeRegistration } from "../entities";

export interface IExchangeRegistrationService {
  retrieveExchangeValues(
    currencyPair: string[]
  ): Promise<ExchangeRegistration[]>;
}
