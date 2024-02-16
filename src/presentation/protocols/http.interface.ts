export interface IHttpRequest {
    method: string;
    query: Record<string, string>;
    params: Record<string, string>;
    body: Record<string, any>;
}

export interface IHttpResponse {
    statusCode: number;
    body: unknown;
}
