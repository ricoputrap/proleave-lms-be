import express, { Express } from "express";
import { PORT } from "../config";

const startServer = () => {
  const app: Express = express();

  // middlewares
  app.use(express.json());

  // listen to connection on the configured port
  app.listen(PORT, () => {
    console.log(`SERVER STARTS on PORT ${PORT}`);
  });
}

startServer();