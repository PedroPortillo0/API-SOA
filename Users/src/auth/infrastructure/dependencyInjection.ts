import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/use-cases/RegisterUser";
import { VerifyUser } from "../application/use-cases/VerifyUser";
import { LoginUser } from "../application/use-cases/LoginUser";
import { SendPasswordResetCode } from "../application/use-cases/PasswordGmailValider";

import { RegisterUserController } from "./controllers/RegisterUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { SendPasswordResetCodeController } from "./controllers/PasswordGmailValiderController";

import { BcryptHashService } from "./services/BcryptHashService";
import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

import { createRabbitMQChannel } from "../../_config/rabbitmq.config";
import { UserVerifiedConsumer } from "./consumers/UserVerifiedConsumer";

// Servicios
const hashService = new BcryptHashService();

// Casos de uso
const registerUser = new RegisterUser(
  userRepository,
  contactRepository,
  hashService,
  rabbitmqEventPublisher
);
const verifyUser = new VerifyUser(
  userRepository,
  contactRepository,
  rabbitmqEventPublisher
);
const loginUser = new LoginUser(userRepository, hashService);
const sendPasswordResetCode = new SendPasswordResetCode(
  contactRepository, // Para verificar el correo del contacto
  userRepository, // Para verificar el ID del usuario
  rabbitmqEventPublisher // Para publicar el evento de notificación
);

// Controladores
const registerUserController = new RegisterUserController(registerUser);
const loginUserController = new LoginUserController(loginUser);
const sendPasswordResetCodeController = new SendPasswordResetCodeController(
  sendPasswordResetCode
);

// Inicialización de consumidores
const initializeConsumers = async (retries = 5, delay = 10000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Crear el canal de RabbitMQ
      const channel = await createRabbitMQChannel();

      // Instanciar el consumidor
      const userVerifiedConsumer = new UserVerifiedConsumer(channel, verifyUser);

      // Iniciar el consumo de mensajes
      await userVerifiedConsumer.consume();

      console.log("RabbitMQ UserVerifiedConsumer initialized successfully ✅");
      return; // Salir si la inicialización es exitosa
    } catch (error) {
      console.error(
        `Error initializing UserVerifiedConsumer (attempt ${attempt}/${retries}): ❗`,
        error
      );

      // Si no es el último intento, esperar antes de reintentar
      if (attempt < retries) {
        console.log(`Reintentando en ${delay / 1000} segundos... ⏳`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // Si todos los intentos fallan, mostrar un error crítico y salir
  console.error(
    "No se pudo inicializar UserVerifiedConsumer después de múltiples intentos. ❌"
  );
  process.exit(1);
};

// Exportaciones
export {
  registerUserController,
  loginUserController,
  sendPasswordResetCodeController,
  initializeConsumers,
};
