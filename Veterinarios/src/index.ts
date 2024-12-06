import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { contactVeterinarioRoutes } from "./ContacVeterinario/Infraestructure/Routes/ContactVeterinarioRoutes";
import { VeterinarioRoutes } from "./Veterinario/Infraestructure/Routes/VeterinarioRoutes";
import { authRoutes } from "./auth/Infraestructure/routes/authRoutes";
import { CitaMascotasRoutes } from "./CitaMascotas/Infraestructure/Routes/CitasMascotasRoutes";

import { initializeConsumers } from "./auth/Infraestructure/dependencyInyection";
import { connectWithRetry } from "./_config/db.config";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v3/Contact/veterinario", contactVeterinarioRoutes);
app.use("/api/v3/veterinario", VeterinarioRoutes);
app.use("/api/v3/veterinario", authRoutes);
app.use("/api/v3/citas", CitaMascotasRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectWithRetry(5, 5000);

    await initializeConsumers();
    console.log("✅ Consumidores inicializados");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error crítico al iniciar el servidor:", error);
    process.exit(1);
  }
})();
