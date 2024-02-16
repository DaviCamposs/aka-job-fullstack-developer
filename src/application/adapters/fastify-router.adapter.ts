import { FastifyReply, FastifyRequest } from "fastify";
import {
  Controller,
  IHttpRequest,
  IHttpResponse,
} from "../../presentation/protocols";
import { RequestHelper } from "../helpers";

export const adaptRoute = (controllerFactory: () => Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const controller: Controller = controllerFactory();

    const httpRequest: IHttpRequest = RequestHelper.parseFastifyRequest(req);
    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode);
    res.send(httpResponse.body);
  };
};
