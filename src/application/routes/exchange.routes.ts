import { FastifyPluginCallback } from "fastify";
import { adaptRoute } from "../adapters";
import {
  fetchExchangeDataFromAPIControllerFactory,
  getExchangeHistoryControllerFactory,
  loginControllerFactory,
  registerUserControllerFactory,
} from "../factories/controllers";

const exchangeRoutes: FastifyPluginCallback = (app, opts, done) => {
  app.get(
    "/",
    adaptRoute(() => fetchExchangeDataFromAPIControllerFactory())
  );

  app.get(
    "/history",
    adaptRoute(() => getExchangeHistoryControllerFactory())
  );

  done();
};

export default exchangeRoutes;
