import amqp, { Connection, Channel } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

class RabbitMQ {
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

    public async testConnection(): Promise<void> {
        try {
            await this.connect();
            console.log('Conexión a RabbitMQ exitosa');
        } catch (error) {
            console.error('No se pudo conectar a RabbitMQ:', error);
        }
    }

    public getChannel(): Channel {
        if (!this.channel) {
            throw new Error('RabbitMQ no está conectado');
        }
        return this.channel;
    }

    public async close(): Promise<void> {
        try {
            if (this.channel) await this.channel.close();
            if (this.connection) await this.connection.close();
            console.log('Conexión a RabbitMQ cerrada');
        } catch (error) {
            console.error('Error al cerrar RabbitMQ:', error);
        }
    }
}

export default new RabbitMQ();
