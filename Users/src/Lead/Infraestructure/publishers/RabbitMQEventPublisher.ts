import amqp from 'amqplib';
import { EventPublisher } from '../../Domain/repositories/EventPublisher';
import dotenv from 'dotenv';

dotenv.config();

export default class RabbitMQEventPublisher implements EventPublisher {
    private channel: amqp.Channel | null = null;

    public async connect(): Promise<void> {
        if (!this.channel) {
            const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
            this.channel = await connection.createChannel();
            await this.channel.assertQueue(process.env.RABBITMQ_QUEUE_NOTILEAD as string, { durable: true });
            console.log('Conectado a RabbitMQ');
        }
    }

    public async publishEvent(event: any): Promise<void> {
        if (!this.channel) {
            await this.connect();
        }

        const message = JSON.stringify(event);
        this.channel!.sendToQueue(process.env.RABBITMQ_QUEUE_NOTILEAD as string, Buffer.from(message), {
            persistent: true
        });

        console.log('Evento publicado en la cola:', message);
    }
}
