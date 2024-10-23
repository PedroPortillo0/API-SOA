import { RegisterUser } from '../../src/Usuario/Application/useCases/RegisterUser';
import { UserRepository } from '../../src/Usuario/Domain/repositories/UserRepository';
import { NotificationService } from '../../src/Notificaciones/Infraestructure/services/NotificationService';
import { User } from '../../src/Usuario/Domain/models/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

// Hacer un mock de bcrypt para simular el comportamiento de hash
jest.mock('bcrypt');

const mockUserRepository: jest.Mocked<UserRepository> = {
  createUser: jest.fn(),
  saveTokenByUuid: jest.fn(),
  findTokenByUuid: jest.fn(),
  verifyUserByUuid: jest.fn(),
};

const mockNotificationService: jest.Mocked<NotificationService> = {
  sendWhatsAppNotification: jest.fn(),
};

describe('RegisterUser', () => {
  let registerUser: RegisterUser;

  beforeEach(() => {
    registerUser = new RegisterUser(mockUserRepository, mockNotificationService);
  });

  it('debería registrar un usuario y enviar un token por WhatsApp', async () => {
    const email = 'usuario@example.com';
    const password = 'password123';
    const phone = '+521234567890';

    const token = '123456';
    const hashedPassword = 'hashed_password';
    const uuid = uuidv4();

    // Mockear el método bcrypt.hash para que devuelva el hashedPassword simulado
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    // Ejecutar el caso de uso
    const result = await registerUser.execute(email, password, phone);

    // Verificar que las funciones del repositorio y notificación se llamaron correctamente
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(expect.any(User));
    expect(mockUserRepository.saveTokenByUuid).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    expect(mockNotificationService.sendWhatsAppNotification).toHaveBeenCalledWith(phone, expect.any(String));

    // Verificar el resultado
    expect(result).toEqual({ uuid: expect.any(String), token: expect.any(String) });
  });
});
