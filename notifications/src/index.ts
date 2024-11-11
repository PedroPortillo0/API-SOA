import express from "express";
import cors from "cors";
import { env } from "./_config/env.config";
import { connect } from "./_helpers/odmConnection";
import { initializeConsumers } from "./notifications/infrastructure/dependencyInjection";
import { tokenRoutes } from "./tokens/infrastructure/routes/tokenRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/notifications", tokenRoutes);

connect(() => {
  initializeConsumers();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
