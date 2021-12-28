import "reflect-metadata";

import { getApp } from "./app";
import { getEnv } from "./env";

async function main() {

  // Check environment

  const env = getEnv();

  // Create pg pool

  // const pool = getPool(Environment.POOL_CONFIG);
  
  // Bootstrap express
  const app = getApp();

  // Start listen

  app.listen(
    env.NODE_PORT,
    () => { console.log(`Started app on port ${env.NODE_PORT}`); }
  );

  // Terminate pool

  // process.on('exit', async () => {
  //   await pool.end();
  // })
}

main()
  .catch(console.error);
