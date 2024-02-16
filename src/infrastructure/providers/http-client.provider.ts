import { IHttpClientProvider } from "../../domain/providers";
import { IHttpClientRequestConfig, IHttpClientResponse } from "../../domain/providers/@types";
import axios, { AxiosResponse } from 'axios';

export class HttpClientProviderImpl implements IHttpClientProvider {
    async fetch<T>(request: IHttpClientRequestConfig): Promise<IHttpClientResponse<T>> {
        const result: AxiosResponse = await axios({
            url: request.url,
            method: request.method,
        });

        return result;
    }
    
}