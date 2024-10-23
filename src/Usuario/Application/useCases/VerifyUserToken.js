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
exports.VerifyUserToken = void 0;
class VerifyUserToken {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(uuid, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield this.userRepository.findTokenByUuid(uuid);
            if (!userToken) {
                throw new Error('Token no encontrado');
            }
            const tokenCreatedAt = new Date(userToken.created_at);
            const currentTime = new Date();
            const timeDifference = (currentTime.getTime() - tokenCreatedAt.getTime()) / 1000;
            if (timeDifference > 120) { // Token expira en 2 minutos
                throw new Error('El token ha expirado');
            }
            if (userToken.token !== token) {
                throw new Error('Token inválido');
            }
            yield this.userRepository.verifyUserByUuid(uuid);
            return true;
        });
    }
}
exports.VerifyUserToken = VerifyUserToken;
