import { Channel, ConsumeMessage } from "amqplib";
import { VerifyUser } from "../../application/use-cases/VerifyUser";

export class UserVerifiedConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly verifyUser: VerifyUser
  ) {}
  async consume(): Promise<void> {
    await this.channel.assertQueue("user_verified", { durable: true });
    this.channel.consume(
      "user_verified",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { userId } = JSON.parse(msg.content.toString());
            await this.verifyUser.execute(userId);
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
