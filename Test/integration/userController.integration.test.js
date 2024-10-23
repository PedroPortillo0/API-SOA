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
const supertest_1 = __importDefault(require("supertest"));
const Server_1 = __importDefault(require("../../src/Server"));
const db_1 = __importDefault(require("../../src/config/db"));
describe('User API Integration Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.query('DELETE FROM users');
        yield db_1.default.query('DELETE FROM tokens');
    }));
    it('Debería registrar un usuario y enviar un token por WhatsApp', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Server_1.default)
            .post('/api/users/register')
            .send({
            email: 'usuario@example.com',
            password: 'password123',
            phone: '+521234567890',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('message', 'Usuario registrado con éxito. Token enviado por WhatsApp.');
        const [users] = yield db_1.default.query('SELECT * FROM users WHERE email = ?', ['usuario@example.com']);
        expect(users.length).toBe(1);
        const [tokens] = yield db_1.default.query('SELECT * FROM tokens WHERE user_id = ?', [users[0].id]);
        expect(tokens.length).toBe(1);
    }));
    it('Debería verificar el usuario con el token correcto', () => __awaiter(void 0, void 0, void 0, function* () {
        const [user] = yield db_1.default.query('SELECT * FROM users WHERE email = ?', ['usuario@example.com']);
        const [token] = yield db_1.default.query('SELECT * FROM tokens WHERE user_id = ?', [user[0].id]);
        const response = yield (0, supertest_1.default)(Server_1.default)
            .post('/api/users/verify-token')
            .send({
            uuid: user[0].uuid,
            token: token[0].token,
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Usuario verificado con éxito');
        const [updatedUser] = yield db_1.default.query('SELECT * FROM users WHERE id = ?', [user[0].id]);
        expect(updatedUser[0].is_verified).toBe(1);
    }));
});
