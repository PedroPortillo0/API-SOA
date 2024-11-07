import express from 'express';
import dotenv from 'dotenv';
// import userRoutes from './Usuario/Infraestructure/Routes/userRoutes';
import leadRoutes from './Lead/Infraestructure/Routes/leadRoutes';
import { testConnection } from './Config/Db';
import rabbitMQ from './Config/RabbitMQ';

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
// app.use('/api/v1/users', userRoutes);
app.use('/api/v1/leads', leadRoutes);

// Prueba de conexión a la base de datos
testConnection();

// Prueba de conexión a RabbitMQ
rabbitMQ.testConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
