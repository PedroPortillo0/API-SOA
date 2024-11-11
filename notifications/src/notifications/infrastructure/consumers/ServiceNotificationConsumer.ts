import { Channel, ConsumeMessage } from "amqplib";
import { GenerateTokenForUser } from "../../../tokens/application/use-cases/GenerateTokenForUser";
import { SendNotification } from "../../application/use-cases/SendNotification";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";

export class ServiceNotificationConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly generateTokenForUser: GenerateTokenForUser,
    private readonly sendNotification: SendNotification
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("service_notification", { durable: true });

    this.channel.consume(
      "service_notification",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const {
              identifier,
              recipientType,
              email,
              phone,
              message,
              channel,
              type,
            } = JSON.parse(msg.content.toString());

            let finalMessage = message;
            const notificationChannel = NotificationChannel.from(channel);

            if (type === "2FA") {
              const token = await this.generateTokenForUser.execute(identifier);
              finalMessage = `${message}. Su código de verificación es: ${token.getCode()}`;
            }

            const recipient = notificationChannel.isWhatsApp() ? phone : email;
            await this.sendNotification.execute(
              identifier,
              recipientType,
              finalMessage,
              notificationChannel,
              recipient
            );

            this.channel.ack(msg);
          } catch (error) {
            this.channel.nack(msg, false, true);
          }
        }
      },
      { noAck: false }
    );
  }
}
