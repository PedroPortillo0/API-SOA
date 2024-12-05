import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import solicitudesrouter from "./Solicitudes/Infraestructure/Routes/SolicitudesRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3005; 

app.use("/api/v3/solicitudes", solicitudesrouter );


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });