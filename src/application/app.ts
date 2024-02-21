import Fastify from "fastify";
import fastifyCors from '@fastify/cors';
import authenticationRoutes from "./routes/authentication.routes";
import exchangeRoutes from "./routes/exchange.routes";
import cron from "node-cron";

const app = Fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(authenticationRoutes, { prefix: "/users" });
app.register(exchangeRoutes, { prefix: "/exchange" });

cron.schedule("* * * * *", async () => {
  try {
    const response = await app.inject({
      method: "GET",
      url: "/exchange",
    });

    console.log(response.body)
  } catch (error) {
    console.error("Error calling route:", error);
  }
});

export default app;
