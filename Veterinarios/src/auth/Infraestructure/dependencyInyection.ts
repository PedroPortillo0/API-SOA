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
const initializeConsumers = async (retries = 5, delay = 1000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Crear el canal de RabbitMQ
        const channel = await createRabbitMQChannel();
  
        // Instanciar el consumidor
        const veterinarioVerifiedConsumer = new VeterinarioVerifiedConsumer(
          channel,
          verifyVeterinario
        );
  
        // Iniciar el consumo de mensajes
        await veterinarioVerifiedConsumer.consume();
  
        console.log("RabbitMQ VeterinarioVerifiedConsumer initialized successfully ✅");
        return; // Salir si la inicialización es exitosa
      } catch (error) {
        console.error(
          `Error initializing VeterinarioVerifiedConsumer (attempt ${attempt}/${retries}): ❗`,
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
      "No se pudo inicializar VeterinarioVerifiedConsumer después de múltiples intentos. ❌"
    );
    process.exit(1);
  };

// Exportaciones
export {
    registerUserController,
    loginUserController,
    initializeConsumers,
};


