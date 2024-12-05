import { Router } from "express";
import{
    findAllSolicitudesController,
    findSolicitudesByIdController,
    saveSolicitudesController,
    updateSolicitudesController 
} from "../dependencyInyeccion";

const solicitudesrouter = Router();


solicitudesrouter.get('/', (req, res) => {
    findAllSolicitudesController.handle(req, res);
});

solicitudesrouter.get('/id/:id', (req, res) => {
    findSolicitudesByIdController.handle(req, res);
});

solicitudesrouter.post('/', (req, res) => {
    saveSolicitudesController.handle(req, res);
});

solicitudesrouter.patch('/id/:id', (req, res) => {
    updateSolicitudesController.handle(req, res);
});

export default solicitudesrouter;
