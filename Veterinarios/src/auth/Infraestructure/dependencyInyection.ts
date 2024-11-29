import { mysqlContactRepository } from "../../ContacVeterinario/Infraestructure/dependencyInyeccion";  
import { mysqlUserRepository } from "../../Veterinario/Infraestructure/dependendyInyeccion";  

import { RegisterVeterinario } from "../Application/use-case/RegisterVeterinario"; 
import { VerifyVeterinario } from "../Application/use-case/VerifyVeterinario"; 
import { LoginVeterinario } from "../Application/use-case/LoginVeterinario"; 
// falta la de cambiar contrasenia

import { LoginVeterinarioController } from "./controllers/LoginVeterinarioController"; 
import { RegisterUserController } from "./controllers/RegisterVeterinarioController"; 
// me falta el controller de cambiar contrasenia

import { BcryptHashService } from "./services/BcryptHashService";
import { rabbitmqEventPublisher } from "../../_shared/Infraestructure/eventPublishers/rabbitmqEventPublisher"; 

import { createRabbitMQChannel } from "../../_config/rabbitmq.config";
import { VeterinarioVerifiedConsumer } from "./consumers/VeterinarioVerifiedConsummer"; 

//servicios
const hashService = new BcryptHashService();

// Casos de uso
const registerVeterinario = new RegisterVeterinario(
    mysqlUserRepository,
    mysqlContactRepository,
    hashService,
    rabbitmqEventPublisher
);
  const verifyVeterinario = new VerifyVeterinario(
    mysqlUserRepository,
    mysqlContactRepository,
    rabbitmqEventPublisher
);
const loginVeterinario = new LoginVeterinario(mysqlUserRepository, hashService);

// Controladores
const registerUserController = new RegisterUserController(registerVeterinario);
const loginUserController = new LoginVeterinarioController(loginVeterinario);

// Inicialización de consumidores
const initializeConsumers = async () => {
    const channel = await createRabbitMQChannel();
  
    const veterinarioVerifiedConsumer = new VeterinarioVerifiedConsumer(channel, verifyVeterinario);
  
    await veterinarioVerifiedConsumer.consume();
};

// Exportaciones
export {
    registerUserController,
    loginUserController,
    initializeConsumers,
};


