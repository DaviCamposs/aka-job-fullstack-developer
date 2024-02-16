export interface IHttpClientRequestConfig {
    url: string;
    method: 'get' | 'delete' | 'post' | 'put';
}

export interface IHttpClientResponse<T> {
    status: number;
    data: T;
    headers: Record<string, any>;
}
