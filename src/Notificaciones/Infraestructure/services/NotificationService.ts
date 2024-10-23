import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export class NotificationService {
  async sendWhatsAppNotification(token: string): Promise<void> {
    const message = `Tu código de verificación es: ${token}`;

    try {
      const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_NUMBER,  // Número tomado del .env
        to: 'whatsapp:+5219686705919'  // Asegúrate de usar el número correcto aquí
      });
      console.log('Mensaje enviado:', response.sid);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw new Error('No se pudo enviar el mensaje de verificación.');
    }
  }
}
