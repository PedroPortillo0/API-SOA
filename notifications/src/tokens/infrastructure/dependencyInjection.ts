import { MongoTokenRepository } from "./persistence/MongoTokenRepository";

import { GenerateTokenForUser } from "../application/use-cases/GenerateTokenForUser";
import { ValidateToken } from "../application/use-cases/ValidateToken";

import { ValidateTokenController } from "./controllers/ValidateTokenController";

import { rabbitmqEventPublisher } from "./eventPublishers/rabbitmqEventPublisher";

const tokenRepository = new MongoTokenRepository();

const generateTokenForUser = new GenerateTokenForUser(tokenRepository);
const validateToken = new ValidateToken(
  tokenRepository,
  rabbitmqEventPublisher
);

const validateTokenController = new ValidateTokenController(validateToken);

export { validateTokenController, generateTokenForUser };
