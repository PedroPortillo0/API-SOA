"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveSolicitudesController = void 0;
class SaveSolicitudesController {
    constructor(saveSolicitudes) {
        this.saveSolicitudes = saveSolicitudes;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { veterinarioid, userid } = req.body;
            if (!veterinarioid || !userid) {
                return res.status(400).json({ message: 'Veterinario ID y Usuario ID son requeridos' });
            }
            try {
                yield this.saveSolicitudes.saveSolicitud(veterinarioid, userid);
                return res.status(201).json({ message: 'Solicitud guardada correctamente' });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
}
exports.SaveSolicitudesController = SaveSolicitudesController;
