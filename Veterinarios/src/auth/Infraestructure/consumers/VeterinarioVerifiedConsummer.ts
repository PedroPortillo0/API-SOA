import { Channel, ConsumeMessage } from "amqplib";
import { VerifyVeterinario } from "../../Application/use-case/VerifyVeterinario"; 

export class VeterinarioVerifiedConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly verifyVeterinario: VerifyVeterinario
  ) {}
  async consume(): Promise<void> {
    await this.channel.assertQueue("user_verified", { durable: true });
    this.channel.consume(
      "user_verified",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { userId } = JSON.parse(msg.content.toString());
            await this.verifyVeterinario.execute(userId);
            this.channel.ack(msg);
          } catch (error) {
            console.error(error);
            this.channel.nack(msg, false, true);
          }
        }
      },
      { noAck: false }
    );
  }
}
