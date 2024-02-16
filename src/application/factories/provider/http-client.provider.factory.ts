import { IHttpClientProvider } from "../../../domain/providers";
import { HttpClientProviderImpl } from "../../../infrastructure/providers";

export const httpClientProviderFactory = (): IHttpClientProvider => {
    return new HttpClientProviderImpl()
}