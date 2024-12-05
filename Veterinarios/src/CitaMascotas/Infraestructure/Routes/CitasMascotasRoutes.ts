import { Router } from "express";
import{
    saveCitasMascotaController,
    findAllCitasMascotasController,
    findCitasMascotaByIdController,
    updateCitasMascotasController,
}from "../dependencyInyeccion"


const CitaMascotasRoutes = Router();

CitaMascotasRoutes.post("/", (req, res) => {
    saveCitasMascotaController.handle(req, res);
});

CitaMascotasRoutes.get("/", (_req, res) => {
    findAllCitasMascotasController.handle(_req, res);
});

CitaMascotasRoutes.get("/:id", (req, res) => {
    findCitasMascotaByIdController.handle(req, res);
});

CitaMascotasRoutes.patch("/:id", (req, res) => {
    updateCitasMascotasController.handle(req, res);
});


export { CitaMascotasRoutes };

