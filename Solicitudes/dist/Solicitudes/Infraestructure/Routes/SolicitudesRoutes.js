"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencyInyeccion_1 = require("../dependencyInyeccion");
const solicitudesrouter = (0, express_1.Router)();
solicitudesrouter.get('/', (req, res) => {
    dependencyInyeccion_1.findAllSolicitudesController.handle(req, res);
});
solicitudesrouter.get('/id/:id', (req, res) => {
    dependencyInyeccion_1.findSolicitudesByIdController.handle(req, res);
});
solicitudesrouter.post('/', (req, res) => {
    dependencyInyeccion_1.saveSolicitudesController.handle(req, res);
});
solicitudesrouter.patch('/id/:id', (req, res) => {
    dependencyInyeccion_1.updateSolicitudesController.handle(req, res);
});
exports.default = solicitudesrouter;
