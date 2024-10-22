import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Usuario/Infraestructure/Routes/userRoutes';
import leadRoutes from './Lead/Infraestructure/Routes/leadRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/leads', leadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
