export interface ExchangeRegistrationAPIData {
  code: string;
  codein: string;
  bid: string;
}

export interface ExchangeRegistrationAPIResponse {
  [currencyPair: string]: ExchangeRegistrationAPIData;
}

export interface IExchangeRegistrationStatistics {
  acronym: string;
  average: number;
  min: number;
  max: number;
}

export interface IExchangeRegistrationStatisticsByHour {
  hour: string; // 2024-02-17-16
  data: IExchangeRegistrationStatistics[];
}

export interface IExchangeRegistrationStatisticsByDay {
  day: string; // 2024-02-17
  data: IExchangeRegistrationStatistics[];
}
