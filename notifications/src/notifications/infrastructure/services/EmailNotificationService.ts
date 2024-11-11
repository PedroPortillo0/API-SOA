import { NotificationService } from "../../domain/services/NotificationService";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";
import { transporter } from "../../../_config/transporter.config";
import { env } from "../../../_config/env.config";

export class EmailNotificationService implements NotificationService {
  async send(
    channel: NotificationChannel,
    message: string,
    recipient: string
  ): Promise<void> {
    if (channel.isEmail()) {
      await transporter.sendMail({
        from: env.email.EMAIL_USER,
        to: recipient,
        subject: "Notificación de nuestra plataforma",
        text: message,
      });
    } else {
      throw new Error("El canal de notificación no es de tipo email");
    }
  }
}
