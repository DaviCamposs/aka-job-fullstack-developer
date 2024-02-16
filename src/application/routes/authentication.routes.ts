import { FastifyPluginCallback } from "fastify";
import { adaptRoute } from "../adapters";
import {
  loginControllerFactory,
  registerUserControllerFactory,
} from "../factories/controllers";

const authenticationRoutes: FastifyPluginCallback = (app, opts, done) => {
  app.post(
    "/",
    adaptRoute(() => registerUserControllerFactory())
  );

  app.post(
    "/login",
    adaptRoute(() => loginControllerFactory())
  );

  done();
};

export default authenticationRoutes;
