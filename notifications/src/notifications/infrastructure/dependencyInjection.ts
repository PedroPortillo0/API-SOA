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

 const initializeConsumers = async (retries = 5, delay = 10000) => {
  for (let i = 0; i < retries; i++) {
    try {
      // Intentar crear el canal de RabbitMQ
      const channel = await createRabbitMQChannel();

      // Instanciar el consumidor con las dependencias necesarias
      const serviceNotificationConsumer = new ServiceNotificationConsumer(
        channel,
        generateTokenForUser,
        sendNotification
      );

      // Iniciar el consumo
      await serviceNotificationConsumer.consume();

      console.log("RabbitMQ consumer initialized successfully ✅");
      return; // Salir de la función si todo fue exitoso
    } catch (error) {
      console.error(
        `Error initializing RabbitMQ consumer (attempt ${
          i + 1
        } of ${retries}): ❗`,
        error
      );

      // Esperar antes de reintentar, si no es el último intento
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  // Si se alcanzó el límite de reintentos, finalizar el proceso
  console.error(
    "Could not initialize RabbitMQ consumer after multiple attempts. Exiting... ❌"
  );
  process.exit(1);
};


export { sendNotification, initializeConsumers };
