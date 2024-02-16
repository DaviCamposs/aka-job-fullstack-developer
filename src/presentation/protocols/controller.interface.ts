import { IHttpRequest, IHttpResponse } from "./http.interface";

export interface Controller {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
