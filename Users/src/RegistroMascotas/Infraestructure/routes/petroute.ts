import express from "express";
import { PetController } from "../controller/PetController";
import { RegisterPet } from "../../Application/RegisterPet";
import { rabbitPetEventPublisher } from "../../../_shared/infrastructure/eventPublishers/rabbitPetEventPublisher";
import { userRepository } from "../../../users/infrastructure/dependencyInjection";

const router = express.Router();

// Configurar dependencias
const registerPet = new RegisterPet(userRepository, rabbitPetEventPublisher);
const petController = new PetController(registerPet);

// Definir rutas
router.post("/users/:userId", (req, res) => petController.registerPet(req, res));

export default router;
