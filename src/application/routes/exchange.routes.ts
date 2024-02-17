import { FastifyPluginCallback } from "fastify";
import { adaptRoute } from "../adapters";
import {
  fetchExchangeDataFromAPIControllerFactory,
  loginControllerFactory,
  registerUserControllerFactory,
} from "../factories/controllers";

const exchangeRoutes: FastifyPluginCallback = (app, opts, done) => {
  app.get(
    "/",
    adaptRoute(() => fetchExchangeDataFromAPIControllerFactory())
  );

  done();
};

export default exchangeRoutes;
