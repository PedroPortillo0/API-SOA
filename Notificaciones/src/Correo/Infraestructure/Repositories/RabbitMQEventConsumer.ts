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
        this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(process.env.RABBITMQ_QUEUE as string, { durable: true });
    }

    public async consume(queue: string, callback: (event: any) => Promise<void>): Promise<void> {
        const channel = await this.getChannel();
        channel.consume(queue, async (msg) => {
            if (msg) {
                const event = JSON.parse(msg.content.toString());
                console.log('Evento recibido:', event);
    
                // Asegúrate de que el evento contenga los datos necesarios para enviar el correo
                if (event.data && event.data.email && event.data.firstName) {
                    // Instancia de la clase que envía los correos
                    const servicioCorreo = new NodemailerServicioCorreo(); // Usa la implementación que tengas
                    const servicioNotificacion = new ServicioNotificacion(servicioCorreo);
    
                    // Llamada al método que envía el correo
                    await servicioNotificacion.enviarCorreoDeBienvenida(event.data.email, event.data.firstName);
                } else {
                    console.error('El evento no contiene email o firstName:', event);
                }
    
                // Marca el mensaje como procesado
                channel.ack(msg);
            }
        });
    }
    
    

    private async getChannel(): Promise<Channel> {
        if (!this.channel) {
            await this.connect();
        }
        return this.channel!;
    }
}

export default RabbitMQEventConsumer;
