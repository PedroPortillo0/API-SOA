import express from "express";
import cors from "cors";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helpers/dbConnection";
import { initializeConsumers } from "./auth/infrastructure/dependencyInjection";
import { contactRoutes } from "./contacts/infrastructure/routes/contactRoutes";
import { userRoutes } from "./users/infrastructure/routes/userRoutes";
import { authRoutes } from "./auth/infrastructure/routes/authRoutes";
import petroute from "./RegistroMascotas/Infraestructure/routes/petroute";

const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", contactRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", authRoutes);
app.use("/api/v3/pets", petroute);

async function startServer() {
  try {
    await connectWithRetry(5, 10000, async () => {
      console.log("Conexión a la base de datos establecida. ✅");

      console.log("Iniciando consumidores...");
      await initializeConsumers();
      console.log("Consumidores inicializados correctamente. ✅");

      app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port} 🚀`);
      });
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); 
  }
}

startServer();
