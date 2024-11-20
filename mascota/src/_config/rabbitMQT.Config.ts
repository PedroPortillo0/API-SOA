import amqp, { Channel, Connection } from "amqplib";
import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env

export async function createRabbitMQConnection(): Promise<Connection> {
    const rabbitMQUrl = process.env.RABBITMQ_URL!;
    return amqp.connect(rabbitMQUrl);
}

export async function createRabbitMQChannel(): Promise<Channel> {
    const connection = await createRabbitMQConnection();
    const channel = await connection.createChannel();

    const queue = process.env.RABBITMQ_QUEUE_USER_TO_PET!;
    await channel.assertQueue(queue, { durable: true }); // Asegura que la cola esté creada

    console.log(`✔️ Cola "${queue}" creada o verificada.`);
    return channel;
}
