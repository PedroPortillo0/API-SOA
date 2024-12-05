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
exports.UpdateSolicitudes = void 0;
class UpdateSolicitudes {
    constructor(solicitudesRepository) {
        this.solicitudesRepository = solicitudesRepository;
    }
    execute(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitud = yield this.solicitudesRepository.findById(id);
            if (!solicitud) {
                throw new Error("Solicitud no encontrada");
            }
            solicitud.setStatus(status);
            yield this.solicitudesRepository.update(id, solicitud);
        });
    }
}
exports.UpdateSolicitudes = UpdateSolicitudes;
