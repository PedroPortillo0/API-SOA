import amqp, { Channel, Connection } from "amqplib";
import 'dotenv/config'; 

export async function createRabbitMQConnection(): Promise<Connection> {
    const rabbitMQUrl = process.env.RABBITMQ_URL!;
    return amqp.connect(rabbitMQUrl);
}
  
  export async function createRabbitMQChannel(): Promise<Channel> {
    const connection = await createRabbitMQConnection();
    const channel = await connection.createChannel();
    return channel;
  }

  