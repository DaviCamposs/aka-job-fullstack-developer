import {
  IExchangeRegistrationStatisticsByDay,
} from "../../services/@types";

export interface IStoreExchangeRegistrationDayHistoryUseCase {
  execute(data: IExchangeRegistrationStatisticsByDay[]): Promise<void>;
}
