import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export class NotificationService {
  async sendWhatsAppNotification(to: string, token: string): Promise<void> {
    const message = `Tu código de verificación es: ${token}`;

    try {
      const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${to}`
      });
      console.log('Mensaje enviado:', response.sid);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw new Error('No se pudo enviar el mensaje de verificación.');
    }
  }
}
