"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const SolicitudesRoutes_1 = __importDefault(require("./Infraestructure/Routes/SolicitudesRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3005;
app.use("/api/v3/Contact/veterinario", SolicitudesRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
