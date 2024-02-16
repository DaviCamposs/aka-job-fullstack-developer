import { FastifyPluginCallback } from 'fastify';
import { adaptRoute } from '../adapters';
import { registerUserControllerFactory } from '../factories/controllers';

const authenticationRoutes: FastifyPluginCallback = (app, opts, done) => {
    app.post('/', adaptRoute(() => registerUserControllerFactory()));

    done();
};

export default authenticationRoutes;