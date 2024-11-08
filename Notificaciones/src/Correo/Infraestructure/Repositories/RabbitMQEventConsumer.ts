import amqp, { Connection, Channel } from 'amqplib';
import dotenv from 'dotenv';
import { EventConsumer } from '../../Domain/Repositories/EventConsumer'; 
import { NodemailerServicioCorreo } from './SendGridServicioCorreo';
import { ServicioNotificacion } from '../../Application/ServicioNotificacion ';

dotenv.config();

class RabbitMQEventConsumer implements EventConsumer {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    public async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
            this.channel = await this.connection.createChannel();

            // Asertar todas las colas configuradas en el archivo .env
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

    public async consume(queue: string, callback: (event: any) => Promise<void>): Promise<void> {
        const channel = await this.getChannel();

        channel.consume(queue, async (msg) => {
            if (msg) {
                try {
                    const event = JSON.parse(msg.content.toString());
                    console.log(`Evento recibido de la cola ${queue}:`, event);

                    // Ejecutar la lógica de manejo de eventos
                    await callback(event);

                    // Marca el mensaje como procesado
                    channel.ack(msg);
                } catch (error) {
                    console.error(`Error al procesar el evento de la cola ${queue}:`, error);
                    // Puedes decidir no marcar el mensaje como procesado para que se reprocese
                }
            }
        });
    }

    // Método privado para obtener el canal de RabbitMQ
    private async getChannel(): Promise<Channel> {
        if (!this.channel) {
            await this.connect();
        }
        if (!this.channel) {
            throw new Error('No se pudo establecer la conexión con el canal de RabbitMQ');
        }
        return this.channel;
    }
}

export default RabbitMQEventConsumer;

// Ejemplo de uso
(async () => {
    const consumer = new RabbitMQEventConsumer();
    await consumer.connect();

    // Consumir de todas las colas configuradas
    const queues = [
        process.env.RABBITMQ_QUEUE_NOTILEAD,
        process.env.RABBITMQ_QUEUE_PAGOS_USER,
        process.env.RABBITMQ_QUEUE_TOKEN_USER,
        process.env.RABBITMQ_QUEUE_TOKEN_VALIDADOR
    ].filter(queue => queue !== undefined) as string[];

    for (const queue of queues) {
        consumer.consume(queue, async (event) => {
            if (event.data && event.data.email && event.data.firstName) {
                // Lógica para enviar correo de bienvenida
                const servicioCorreo = new NodemailerServicioCorreo(); // Usa la implementación adecuada
                const servicioNotificacion = new ServicioNotificacion(servicioCorreo);
                await servicioNotificacion.enviarCorreoDeBienvenida(event.data.email, event.data.firstName);
            } else {
                console.warn(`El evento recibido de la cola ${queue} no tiene los datos requeridos:`, event);
            }
        });
    }
})();
