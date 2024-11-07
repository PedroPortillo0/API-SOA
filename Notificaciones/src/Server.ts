import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './Config/Db';
import RabbitMQEventConsumer from './Correo/Infraestructure/Repositories/RabbitMQEventConsumer';
import { ServicioNotificacion } from './Correo/Application/ServicioNotificacion ';
import { NodemailerServicioCorreo } from './Correo/Infraestructure/Repositories/SendGridServicioCorreo';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Pruebas de conexión a las bases de datos
testConnection("Token", "token").then(() => {
  console.log("Conexión a la base de datos Token completada");
}).catch((error) => {
  console.error("Error en la conexión a la base de datos Token:", error);
});

testConnection("notificaciones", "notifi").then(() => {
  console.log("Conexión a la base de datos notificaciones completada");
}).catch((error) => {
  console.error("Error en la conexión a la base de datos notificaciones:", error);
});

// Configuración del servicio de notificación y consumidor de eventos
const servicioCorreo = new NodemailerServicioCorreo();
const servicioNotificacion = new ServicioNotificacion(servicioCorreo);
const eventConsumer = new RabbitMQEventConsumer();

async function startConsumer() {
    await eventConsumer.connect();
    await eventConsumer.consume(process.env.RABBITMQ_QUEUE as string, async (event) => {
        console.log('Evento recibido:', event);

        const { email, nombre } = event;
        await servicioNotificacion.enviarCorreoDeBienvenida(email, nombre);
        console.log(`Correo de bienvenida enviado a ${email}`);
    });
}

// Iniciar el consumidor de eventos y capturar errores en la consola si algo falla
startConsumer().catch(console.error);

// Iniciar el servidor de notificaciones en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
