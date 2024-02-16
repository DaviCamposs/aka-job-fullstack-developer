import { IHttpRequest } from "../../presentation/protocols";
import { FastifyRequest } from 'fastify';


export const RequestHelper = {
  parseFastifyRequest(req: FastifyRequest): IHttpRequest {
    const { method, params, body, query } = req as any;

    const httpRequest: IHttpRequest = {
      method,
      params,
      body,
      query,
    };

    return httpRequest;
  },
};
