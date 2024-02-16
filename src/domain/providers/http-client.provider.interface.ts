import { IHttpClientRequestConfig, IHttpClientResponse } from "./@types";

export interface IHttpClientProvider {
  fetch<T>(request: IHttpClientRequestConfig): Promise<IHttpClientResponse<T>>;
}
