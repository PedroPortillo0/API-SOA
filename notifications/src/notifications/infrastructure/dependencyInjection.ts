import { SendNotification } from "../application/use-cases/SendNotification";

import { MongoNotificationRepository } from "./persistence/MongoNotificationRepository";

import { MultiChannelNotificationService } from "./services/MultiChannelNotificationService";
import { TwilioNotificationService } from "./services/TwilioNotificationService";
import { EmailNotificationService } from "./services/EmailNotificationService";

import { createRabbitMQChannel } from "../../_config/rabbitmq.config";
import { ServiceNotificationConsumer } from "./consumers/ServiceNotificationConsumer";

import { generateTokenForUser } from "../../tokens/infrastructure/dependencyInjection";

const notificationRepository = new MongoNotificationRepository();

const whatsappService = new TwilioNotificationService();
const emailService = new EmailNotificationService();
const notificationService = new MultiChannelNotificationService(
  whatsappService,
  emailService
);

const sendNotification = new SendNotification(
  notificationRepository,
  notificationService
);

const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const serviceNotificationConsumer = new ServiceNotificationConsumer(
    channel,
    generateTokenForUser,
    sendNotification
  );

  await serviceNotificationConsumer.consume();
};

export { sendNotification, initializeConsumers };
