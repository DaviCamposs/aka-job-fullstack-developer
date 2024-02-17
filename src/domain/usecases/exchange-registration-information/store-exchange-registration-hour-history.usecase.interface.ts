import { IExchangeRegistrationStatisticsByHour } from "../../services/@types";

export interface IStoreExchangeRegistrationHourHistoryUseCase {
    execute(data: IExchangeRegistrationStatisticsByHour[]): Promise<void>
}