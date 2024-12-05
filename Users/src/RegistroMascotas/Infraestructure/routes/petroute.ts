import express from "express";
import { PetController } from "../controller/PetController";
import { RegisterPet } from "../../Application/RegisterPet";
import { rabbitPetEventPublisher } from "../../../_shared/infrastructure/eventPublishers/rabbitPetEventPublisher";
import { userRepository } from "../../../users/infrastructure/dependencyInjection";
import { upload } from "../../../_shared/middlewares/multer";

const router = express.Router();

// Configurar dependencias
const registerPet = new RegisterPet(userRepository, rabbitPetEventPublisher);
const petController = new PetController(registerPet);

// Definir rutas
router.post("/users/:userId", upload.single("image"), (req, res) =>
    petController.registerPet(req, res)
  );

export default router;
