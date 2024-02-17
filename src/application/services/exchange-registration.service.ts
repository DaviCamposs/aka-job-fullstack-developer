import { ExchangeRegistration } from "../../domain/entities";
import { OperationalError } from "../../domain/errors";
import { IHttpClientProvider } from "../../domain/providers";
import { IExchangeRegistrationService } from "../../domain/services";
import { ExchangeRegistrationAPIResponse } from "../../domain/services/@types";
import { ExchangeRegistrationAPIMapper } from "./mappers/exchange-registration.mapper";

const URL_RETRIEVE_EXCHANGE = "https://economia.awesomeapi.com.br/last/";

export class ExchangeRegistrationServiceImpl
  implements IExchangeRegistrationService
{
  constructor(private readonly _httpClient: IHttpClientProvider) {}

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
