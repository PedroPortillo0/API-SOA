import { Router } from "express";
import { 
    saveContactVeterinarioController, 
    findContactByEmailController, 
    findContactByIdController 
} from "../dependencyInyeccion";

const contactVeterinarioRouter = Router();

contactVeterinarioRouter.post(
    "/register",
    saveContactVeterinarioController.handle.bind(saveContactVeterinarioController)
);

contactVeterinarioRouter.get(
    "/email/:email",
    findContactByEmailController.handle.bind(findContactByEmailController)
);

contactVeterinarioRouter.get(
    "/id/:id",
    findContactByIdController.handle.bind(findContactByIdController)
);

export { contactVeterinarioRouter };
