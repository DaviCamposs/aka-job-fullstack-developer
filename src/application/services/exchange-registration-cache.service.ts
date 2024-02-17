import { ExchangeRegistrationCache } from "../../domain/entities";
import { IExchangeRegistrationCacheService } from "../../domain/services";
import {
  IExchangeRegistrationStatisticsByHour,
  IExchangeRegistrationStatisticsByDay,
} from "../../domain/services/@types";

export class ExchangeRegistrationCacheServiceImpl
  implements IExchangeRegistrationCacheService
{
  convertExchangeRegistrationToHourCache(
    input: IExchangeRegistrationStatisticsByHour[]
  ): ExchangeRegistrationCache[] {
    const result: ExchangeRegistrationCache[] = [];

    for (const record of input) {
      const { hour: date, data } = record;
      const [year, month, day] = date.split("-");

      for (const item of data) {
        const { acronym, average, min, max } = item;

        const exchangeRegistrationCache: ExchangeRegistrationCache =
          new ExchangeRegistrationCache(
            item.code_source,
            item.code_destination,
            acronym,
            max,
            min,
            average,
            day,
            month,
            year,
            record.hour,
            "hour"
          );

        result.push(exchangeRegistrationCache);
      }
    }

    return result;
  }
  convertExchangeRegistrationToDayCache(
    input: IExchangeRegistrationStatisticsByDay[]
  ): ExchangeRegistrationCache[] {
    const result: ExchangeRegistrationCache[] = [];

    for (const record of input) {
      const { day: date, data } = record;
      const [year, month, day] = date.split("-");

      for (const item of data) {
        const { acronym, average, min, max } = item;

        const exchangeRegistrationCache: ExchangeRegistrationCache =
          new ExchangeRegistrationCache(
            item.code_source,
            item.code_destination,
            acronym,
            max,
            min,
            average,
            day,
            month,
            year,
            record.day,
            "day"
          );

        result.push(exchangeRegistrationCache);
      }
    }

    return result;
  }
}
