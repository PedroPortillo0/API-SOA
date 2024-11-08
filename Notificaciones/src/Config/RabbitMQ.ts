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

            // Asertar todas las colas
            const queues = [
                process.env.RABBITMQ_QUEUE_NOTILEAD,
                process.env.RABBITMQ_QUEUE_PAGOS_USER,
                process.env.RABBITMQ_QUEUE_TOKEN_USER,
                process.env.RABBITMQ_QUEUE_TOKEN_VALIDADOR
            ].filter(queue => queue !== undefined) as string[];

            for (const queue of queues) {
                await this.channel.assertQueue(queue, { durable: true });
            }

            console.log('Conectado a RabbitMQ y colas aseguradas');
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

    public async consumeFromQueues(queues: string[], callback: (event: any) => Promise<void>): Promise<void> {
        const channel = await this.getChannel();

        for (const queue of queues) {
            channel.consume(queue, async (msg) => {
                if (msg) {
                    const event = JSON.parse(msg.content.toString());
                    try {
                        await callback(event);
                        channel.ack(msg);
                        console.log(`Mensaje procesado de la cola: ${queue}`);
                    } catch (error) {
                        console.error(`Error al procesar el mensaje de la cola ${queue}:`, error);
                        // No enviar un ack si hubo un error para que se pueda reintentar
                    }
                }
            });
        }
    }

    public async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
        console.log('Conexión a RabbitMQ cerrada');
    }
}

export default new RabbitMQEventConsumer();
