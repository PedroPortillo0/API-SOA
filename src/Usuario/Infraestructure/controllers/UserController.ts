import { Request, Response } from 'express';
import { SendTokenToLead } from '../../../Lead/Application/useCases/SendTokenToLead';
import { VerifyUserToken } from '../../Application/useCases/VerifyUserToken';
import { MySQLUserRepository } from '../../Infraestructure/repositories/MySQLUserRepository';
import { MySQLLeadRepository } from '../../../Lead/Infraestructure/repositories/MySQLLeadRepository';
import { NotificationService } from '../../../Notificaciones/Infraestructure/services/NotificationService';

export class UserController {
  // Solicitar token para el lead y crear la contraseña
  static async sendTokenToLead(req: Request, res: Response) {
    const { email, password } = req.body;

    const leadRepository = new MySQLLeadRepository();
    const notificationService = new NotificationService();
    const sendTokenToLead = new SendTokenToLead(leadRepository, notificationService);

    try {
      // Enviar el token y obtener la contraseña hasheada
      const { lead, hashedPassword } = await sendTokenToLead.execute(email, password);
      res.status(200).json({ uuid: lead.uuid, message: 'Token enviado por WhatsApp.' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al verificar el token.' });
      }
    }
  }

  // Verificar el token y mover datos del lead al user
  static async verifyUserToken(req: Request, res: Response) {
    const { uuid, token, hashedPassword } = req.body;

    const userRepository = new MySQLUserRepository();
    const leadRepository = new MySQLLeadRepository();
    const verifyUserToken = new VerifyUserToken(userRepository, leadRepository);

    try {
      // Verificar el token y crear el usuario
      await verifyUserToken.execute(uuid, token);
      res.status(200).json({ message: 'Usuario creado y verificado con éxito.' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error  al crear el usuario.' });
      }
    }
  }
}
