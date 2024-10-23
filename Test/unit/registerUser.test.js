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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterUser_1 = require("../../src/Usuario/Application/useCases/RegisterUser");
const User_1 = require("../../src/Usuario/Domain/models/User");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Hacer un mock de bcrypt para simular el comportamiento de hash
jest.mock('bcrypt');
const mockUserRepository = {
    createUser: jest.fn(),
    saveTokenByUuid: jest.fn(),
    findTokenByUuid: jest.fn(),
    verifyUserByUuid: jest.fn(),
};
const mockNotificationService = {
    sendWhatsAppNotification: jest.fn(),
};
describe('RegisterUser', () => {
    let registerUser;
    beforeEach(() => {
        registerUser = new RegisterUser_1.RegisterUser(mockUserRepository, mockNotificationService);
    });
    it('debería registrar un usuario y enviar un token por WhatsApp', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'usuario@example.com';
        const password = 'password123';
        const phone = '+521234567890';
        const token = '123456';
        const hashedPassword = 'hashed_password';
        const uuid = (0, uuid_1.v4)();
        // Mockear el método bcrypt.hash para que devuelva el hashedPassword simulado
        bcrypt_1.default.hash.mockResolvedValue(hashedPassword);
        // Ejecutar el caso de uso
        const result = yield registerUser.execute(email, password, phone);
        // Verificar que las funciones del repositorio y notificación se llamaron correctamente
        expect(mockUserRepository.createUser).toHaveBeenCalledWith(expect.any(User_1.User));
        expect(mockUserRepository.saveTokenByUuid).toHaveBeenCalledWith(expect.any(String), expect.any(String));
        expect(mockNotificationService.sendWhatsAppNotification).toHaveBeenCalledWith(phone, expect.any(String));
        // Verificar el resultado
        expect(result).toEqual({ uuid: expect.any(String), token: expect.any(String) });
    }));
});
