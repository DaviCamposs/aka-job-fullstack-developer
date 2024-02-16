import * as dotenv from "dotenv";
dotenv.config();

import app from "./src/application/app";

const PORT = Number(process.env.PORT) ?? 3000;

async function main() {
  try {
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
