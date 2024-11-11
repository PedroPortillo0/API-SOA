import { Router } from "express";
import {
  saveContactController,
  findAllContactsController,
  findContactByIdController,
  findContactByEmailController,
  deleteContactByIdController,
} from "../dependencyInjection";

const contactRoutes = Router();

contactRoutes.post(
  "/contacts",
  saveContactController.handle.bind(saveContactController)
);
contactRoutes.get(
  "/contacts",
  findAllContactsController.handle.bind(findAllContactsController)
);
contactRoutes.get(
  "/contacts/id/:id",
  findContactByIdController.handle.bind(findContactByIdController)
);
contactRoutes.get(
  "/contacts/email/:email",
  findContactByEmailController.handle.bind(findContactByEmailController)
);
contactRoutes.delete(
  "/contacts/id/:id",
  deleteContactByIdController.handle.bind(deleteContactByIdController)
);

export { contactRoutes };
