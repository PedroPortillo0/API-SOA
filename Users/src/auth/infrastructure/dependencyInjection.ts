import { contactRepository } from "../../contacts/infrastructure/dependencyInjection";
import { userRepository } from "../../users/infrastructure/dependencyInjection";

import { RegisterUser } from "../application/use-cases/RegisterUser";
import { VerifyUser } from "../application/use-cases/VerifyUser";
import { LoginUser } from "../application/use-cases/LoginUser";

import { RegisterUserController } from "./controllers/RegisterUserController";
import { LoginUserController } from "./controllers/LoginUserController";

import { BcryptHashService } from "./services/BcryptHashService";
import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

import { createRabbitMQChannel } from "../../_config/rabbitmq.config";
import { UserVerifiedConsumer } from "./consumers/UserVerifiedConsumer";

const hashService = new BcryptHashService();

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

const registerUserController = new RegisterUserController(registerUser);
const loginUserController = new LoginUserController(loginUser);

const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const userVerifiedConsumer = new UserVerifiedConsumer(channel, verifyUser);

  await userVerifiedConsumer.consume();
};

export { registerUserController, loginUserController, initializeConsumers };
