import Fastify from "fastify";
import authenticationRoutes from "./routes/authentication.routes";

const app = Fastify();

app.register(authenticationRoutes, { prefix: '/users' })

export default app;
