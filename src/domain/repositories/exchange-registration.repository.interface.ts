import { ExchangeRegistration } from "../entities";

export interface IExchangeRegistrationRepository {
  save(data: ExchangeRegistration[]): Promise<void>;
  find(
    acronym: string,
    day: string | undefined,
    month: string,
    year: string
  ): Promise<ExchangeRegistration[]>;
}
