import { IHttpClientProvider } from "../../../domain/providers";
import { IExchangeRegistrationService } from "../../../domain/services";
import { ExchangeRegistrationServiceImpl } from "../../services";
import { httpClientProviderFactory } from "../provider";

export const exchangeRegistrationServiceFactory =
  (): IExchangeRegistrationService => {
    const httpClient: IHttpClientProvider = httpClientProviderFactory();

    return new ExchangeRegistrationServiceImpl(httpClient);
  };
