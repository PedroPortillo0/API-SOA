import { Router } from "express";
import {
    saveContactVeterinarioController,
    findAllContactVeterinarioController,
    findContactVeterinarioByIdController,
    deleteContactVeterinarioController,
    findContactVeterinarioByEmailController,
} from "../dependencyInyeccion";


const contactVeterinarioRoutes = Router();

contactVeterinarioRoutes.post(
  "/register",
  saveContactVeterinarioController.handle.bind(saveContactVeterinarioController)
);
contactVeterinarioRoutes.get(
  "/",
  findAllContactVeterinarioController.handle.bind(findAllContactVeterinarioController)
);
contactVeterinarioRoutes.get(
  "/id/:id",
  findContactVeterinarioByIdController.handle.bind(findContactVeterinarioByIdController)
);
contactVeterinarioRoutes.get(
  "/email/:email",
  findContactVeterinarioByEmailController.handle.bind(findContactVeterinarioByEmailController)
);
contactVeterinarioRoutes.delete(
  "/id/:id",
  deleteContactVeterinarioController.handle.bind(deleteContactVeterinarioController)
);

export { contactVeterinarioRoutes };
