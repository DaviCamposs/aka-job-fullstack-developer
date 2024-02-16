import * as dotenv from "dotenv";
dotenv.config();

import app from "./src/application/app";
import prisma from "./src/infrastructure/db/prisma";

const PORT = Number(process.env.PORT) ?? 3000;

async function main() {
  try {

    prisma.$connect()

    await app.listen({
      port: PORT,
    });

    console.log(`Server ready at port ${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
