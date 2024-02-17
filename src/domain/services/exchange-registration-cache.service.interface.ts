import { ExchangeRegistrationCache } from "../entities";
import { IExchangeRegistrationStatisticsByDay, IExchangeRegistrationStatisticsByHour } from "./@types";

export interface IExchangeRegistrationCacheService {
    convertExchangeRegistrationToHourCache(input: IExchangeRegistrationStatisticsByHour[]): ExchangeRegistrationCache[] 
    convertExchangeRegistrationToDayCache(input: IExchangeRegistrationStatisticsByDay[]): ExchangeRegistrationCache[] 

}