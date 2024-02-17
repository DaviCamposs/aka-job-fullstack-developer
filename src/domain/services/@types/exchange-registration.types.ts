export interface ExchangeRegistrationAPIData {
  code: string;
  codein: string;
  bid: string
}

export interface ExchangeRegistrationAPIResponse {
  [currencyPair: string]: ExchangeRegistrationAPIData;
}
