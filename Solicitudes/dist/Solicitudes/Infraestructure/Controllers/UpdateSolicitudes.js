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
exports.UpdateSolicitudesController = void 0;
class UpdateSolicitudesController {
    constructor(updateSolicitudes) {
        this.updateSolicitudes = updateSolicitudes;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            if (!id || !status) {
                return res.status(400).json({ message: 'ID y estado son requeridos' });
            }
            if (status !== 'aceptado' && status !== 'rechazado') {
                return res.status(400).json({ message: 'Estado inválido' });
            }
            try {
                yield this.updateSolicitudes.execute(id, status);
                return res.status(200).json({ message: 'Estado de la solicitud actualizado correctamente' });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
}
exports.UpdateSolicitudesController = UpdateSolicitudesController;
