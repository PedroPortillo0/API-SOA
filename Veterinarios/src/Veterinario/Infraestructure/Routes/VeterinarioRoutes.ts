import { Router } from "express";
import {
    findAllVeterinarioController,
    findVeterinarioByIdController,
    findVeterinarioByEmailController,
    deleteVeterinarioByIdController,
    updateVeterinarioController,
} from "../dependendyInyeccion";

const VeterinarioRoutes = Router();

VeterinarioRoutes.get("/", findAllVeterinarioController.handle.bind(findAllVeterinarioController));

VeterinarioRoutes.get(
  "/id/:id",
  findVeterinarioByIdController.handle.bind(findVeterinarioByIdController)
);

VeterinarioRoutes.get(
  "/email/:email",
  findVeterinarioByEmailController.handle.bind(findVeterinarioByEmailController)
);

VeterinarioRoutes.delete(
  "/id/:id",
  deleteVeterinarioByIdController.handle.bind(deleteVeterinarioByIdController)
);

VeterinarioRoutes.patch(
  "/:id",
  updateVeterinarioController.handle.bind(updateVeterinarioController)
);

export { VeterinarioRoutes };
