import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import { contactVeterinarioRouter } from "./contactVeterinario/Infraestructure/routes/contactVeterinarioRoutes";


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/v3/veterinario", contactVeterinarioRouter);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
