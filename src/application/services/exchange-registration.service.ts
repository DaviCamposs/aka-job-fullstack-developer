import { ExchangeRegistration } from "../../domain/entities";
import { OperationalError } from "../../domain/errors";
import { IHttpClientProvider } from "../../domain/providers";
import { IExchangeRegistrationService } from "../../domain/services";
import { ExchangeRegistrationAPIResponse, IExchangeRegistrationStatistics, IExchangeRegistrationStatisticsByDay, IExchangeRegistrationStatisticsByHour } from "../../domain/services/@types";
import { ExchangeRegistrationAPIMapper } from "./mappers/exchange-registration.mapper";

const URL_RETRIEVE_EXCHANGE = "https://economia.awesomeapi.com.br/last/";

interface IExchangeRegistrationStatisticsControl {
  acronym: string;
  average: number;
  min: number;
  max: number;

  count: number
}


interface IExchangeRegistrationGroup {
  [key: string]: IExchangeRegistrationStatisticsControl[];
}

export class ExchangeRegistrationServiceImpl
  implements IExchangeRegistrationService
{
  constructor(private readonly _httpClient: IHttpClientProvider) {}
  calculateStatisticsByDay(input: IExchangeRegistrationStatisticsByHour[]): IExchangeRegistrationStatisticsByDay[] {
    const result: IExchangeRegistrationStatisticsByDay[] = [];

    for (const hourData of input) {
        const day = hourData.hour.split('-').slice(0, 3).join('-'); // Extract day from hour

        let dayEntry = result.find(entry => entry.day === day);
        if (!dayEntry) {
            dayEntry = { day, data: [] };
            result.push(dayEntry);
        }

        dayEntry.data.push(...hourData.data);
    }

    // calculate statistics for each day
    for (const dayEntry of result) {
        const groupedByAcronym: { [acronym: string]: IExchangeRegistrationStatistics } = {};
        for (const stat of dayEntry.data) {
            if (!groupedByAcronym[stat.acronym]) {
                groupedByAcronym[stat.acronym] = { acronym: stat.acronym, average: 0, min: stat.min, max: stat.max };
            } else {
                groupedByAcronym[stat.acronym].min = Math.min(groupedByAcronym[stat.acronym].min, stat.min);
                groupedByAcronym[stat.acronym].max = Math.max(groupedByAcronym[stat.acronym].max, stat.max);
            }
            groupedByAcronym[stat.acronym].average += stat.average;
        }
        for (const acronym in groupedByAcronym) {
            const stats = groupedByAcronym[acronym];
            stats.average /= dayEntry.data.filter(stat => stat.acronym === acronym).length;
        }
        dayEntry.data = Object.values(groupedByAcronym);
    }

    return result;
  }
  
  calculateStatisticsByHour(input: ExchangeRegistration[]): IExchangeRegistrationStatisticsByHour[] {
    const groupedData: IExchangeRegistrationGroup = {};

    // Calculate the sum of values for each acronym within each hour
    input.forEach(item => {
        const date = new Date(item.date);
        const hour = date.toISOString().split('T')[0] + '-' + date.getUTCHours().toString();
        const value = item.value;

        if (!groupedData[hour]) {
            groupedData[hour] = [];
        }

        const existingStats = groupedData[hour].find(stats => stats.acronym === item.acronym);

        if (!existingStats) {
            groupedData[hour].push({
                acronym: item.acronym,
                average: value,
                min: value,
                max: value,
                count: 1
            });
        } else {
            existingStats.average = (existingStats.average * existingStats.count + value) / (existingStats.count + 1);
            existingStats.count++;
            existingStats.min = Math.min(existingStats.min, value);
            existingStats.max = Math.max(existingStats.max, value);
        }
    });

    // Convert to result format
    const result: IExchangeRegistrationStatisticsByHour[] = [];
    for (const hour in groupedData) {
        result.push({ hour, data: groupedData[hour].map(item => {
          return {
            acronym: item.acronym,
            average: item.average,
            max: item.max,
            min: item.min
          }
        }) });
    }

    return result;
  }


  async retrieveExchangeValues(
    currencyPair: string[]
  ): Promise<ExchangeRegistration[]> {
    const exchangeValuesFetched =
      await this._httpClient.fetch<ExchangeRegistrationAPIResponse>({
        url: URL_RETRIEVE_EXCHANGE + currencyPair.join(","),
        method: "get",
      });

    if (exchangeValuesFetched.status !== 200)
      throw new OperationalError(
        "It was not possible to retrieve exchange values"
      );

    const exchangeValues: ExchangeRegistration[] =
      new ExchangeRegistrationAPIMapper().toDomain(exchangeValuesFetched.data);

    return exchangeValues;
  }
}
