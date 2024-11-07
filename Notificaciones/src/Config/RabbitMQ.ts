import amqp, { Connection, Channel } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

class RabbitMQEventConsumer {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    public async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(process.env.RABBITMQ_QUEUE as string, { durable: true });
            console.log('Conectado a RabbitMQ');
        } catch (error) {
            console.error('Error al conectar a RabbitMQ:', error);
            throw error;
        }
    }

    // Método para obtener el canal asegurado
    private async getChannel(): Promise<Channel> {
        if (!this.channel) {
            await this.connect();
        }
        if (!this.channel) {
            throw new Error('No se pudo conectar a RabbitMQ');
        }
        return this.channel;
    }

    public async consume(queue: string, callback: (event: any) => Promise<void>): Promise<void> {
        // Obtén el canal usando getChannel(), lo cual asegura que no sea null
        const channel = await this.getChannel();

        channel.consume(queue, async (msg) => {
            if (msg) {
                const event = JSON.parse(msg.content.toString());
                await callback(event);
                channel.ack(msg);
            }
        });
    }

    public async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
        console.log('Conexión a RabbitMQ cerrada');
    }
}

export default RabbitMQEventConsumer;
