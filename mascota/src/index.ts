import 'dotenv/config';
import express from 'express';
import { connectToDatabase } from './_config/db.config';
// import petRoutes from './Infrastructure/routes/petRoutes';
import { RabbitMQPetConsumer } from './Infraestructure/message_broker/RabbitMQConsumer';
import { PetRepository } from './Infraestructure/percistence/PetRepository';
import { createRabbitMQChannel } from './_config/rabbitMQT.Config';

const app = express();
const PORT = process.env.PORT || 3003;

(async () => {
    try {
        // Conectar a la base de datos
        const db = await connectToDatabase();
        const petRepository = new PetRepository(db); // Repositorio de mascotas

        // Middleware para JSON
        app.use(express.json());

        // Configurar rutas
        // app.use('/api/pets', petRoutes(petRepository)); // Pasar el repositorio a las rutas

        // Conexión a RabbitMQ y creación del canal
        const rabbitChannel = await createRabbitMQChannel();

        // Crear instancia del consumidor con el canal y el repositorio
        const rabbitConsumer = new RabbitMQPetConsumer(rabbitChannel, petRepository);

        // Iniciar el consumidor para procesar mensajes
        await rabbitConsumer.startConsuming();

        console.log("RabbitMQ Consumer iniciado con éxito.");

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error inicializando el servidor o RabbitMQ Consumer:', error);
    }
})();
