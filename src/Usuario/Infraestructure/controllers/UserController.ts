import { Request, Response } from 'express';
import { RegisterUser } from '../../Application/useCases/RegisterUser';
import { VerifyUserToken } from '../../Application/useCases/VerifyUserToken';
import { MySQLUserRepository } from '../../Infraestructure/repositories/MySQLUserRepository';
import { NotificationService } from '../../../Notificaciones/Infraestructure/services/NotificationService';

export class UserController {
  static async registerUser(req: Request, res: Response) {
    const { email, password, phone } = req.body;

    const userRepository = new MySQLUserRepository();
    const notificationService = new NotificationService();
    const registerUser = new RegisterUser(userRepository, notificationService);

    try {
      const { uuid, token } = await registerUser.execute(email, password, phone);
      res.status(201).json({ uuid, message: 'Usuario registrado con éxito. Token enviado por WhatsApp.' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al registrar el usuario o enviar el token.' });
      }
    }
  }

  static async verifyUserToken(req: Request, res: Response) {
    const { uuid, token } = req.body;

    const userRepository = new MySQLUserRepository();
    const verifyUserToken = new VerifyUserToken(userRepository);

    try {
      await verifyUserToken.execute(uuid, token);
      res.status(200).json({ message: 'Usuario verificado con éxito' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al verificar el token.' });
      }
    }
  }
}
