import express from "express";
import cors from "cors";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/odmConnection";
import { initializeConsumers } from "./notifications/infrastructure/dependencyInjection";
import { tokenRoutes } from "./tokens/infrastructure/routes/tokenRoutes";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/notifications", tokenRoutes);

async function startServer() {
  try {
    await connectWithRetry(5, 10000);
    console.log("Conexión a la base de datos establecida ✅");

    console.log("Iniciando consumidores...");
    await initializeConsumers(5, 2000); 
    console.log("Consumidores inicializados correctamente ✅");

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port} 🚀`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); 
  }
}

startServer();
