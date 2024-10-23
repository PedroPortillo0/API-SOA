import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Usuario/Infraestructure/Routes/userRoutes';
import leadRoutes from './Lead/Infraestructure/Routes/leadRoutes';

try {
  dotenv.config();
  console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
  console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
  console.log("TWILIO_WHATSAPP_NUMBER:", process.env.TWILIO_WHATSAPP_NUMBER);
} catch (error) {
  console.error('Error al cargar el archivo .env:', error);
}

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/leads', leadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
