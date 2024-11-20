import 'dotenv/config';
import express from 'express';
import { connectToDatabase } from './_config/db.config';
import petRoutes from './Infraestructure/routes/petRoutes';
import { RabbitMQConsumer } from './Infraestructure/message_broker/RabbitMQConsumer';

const app = express();
const PORT = process.env.PORT || 3003;

(async () => {
    try {
        // Conectar a la base de datos
        const db = await connectToDatabase();

        // Middleware para JSON
        app.use(express.json());

        // Configurar rutas
        app.use('/api/pets', petRoutes(db));

        // Inicializar RabbitMQConsumer y consumir mensajes
        const rabbitConsumer = new RabbitMQConsumer();
        await rabbitConsumer.init();
        await rabbitConsumer.consumeUserToPetQueue();

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
})();
