import express from "express";
import bodyParser from "body-parser";

import UserController from "./users/controller";

export function getApp() {

  const app = express();

  // app.use(helmet());
  app.use(bodyParser.json());

  // Loading Modules

  app.use('/api/v1/users', UserController);

  return app;
}
