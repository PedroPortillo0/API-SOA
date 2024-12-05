import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import { contactVeterinarioRoutes } from "./ContacVeterinario/Infraestructure/Routes/ContactVeterinarioRoutes"; 
import { VeterinarioRoutes } from "./Veterinario/Infraestructure/Routes/VeterinarioRoutes";
import { authRoutes } from "./auth/Infraestructure/routes/authRoutes";
import { CitaMascotasRoutes } from "./CitaMascotas/Infraestructure/Routes/CitasMascotasRoutes"; 

import { initializeConsumers } from "./auth/Infraestructure/dependencyInyection";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v3/Contact/veterinario", contactVeterinarioRoutes);
app.use("/api/v3/veterinario", VeterinarioRoutes);
app.use("/api/v3/veterinario", authRoutes);
app.use("/api/v3/veterinario", authRoutes);
app.use("/api/v3/citas", CitaMascotasRoutes);

const PORT = process.env.PORT || 3000; 

// initializeConsumers();

async function consumer() {
  try {
    await initializeConsumers();
    console.log("conectado")
    
  } catch (error) {
    console.error(error)
    
  }
}

consumer();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


