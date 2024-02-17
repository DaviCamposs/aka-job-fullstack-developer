import { ExchangeRegistration } from "../entities";

export interface IExchangeRegistrationRepository {
  save(data: ExchangeRegistration[]): Promise<void>;
}
