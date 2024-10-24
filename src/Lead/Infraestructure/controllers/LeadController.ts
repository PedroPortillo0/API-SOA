import { Request, Response } from 'express';
import { RegisterLead } from '../../Application/useCases/RegisterLead';
import { MySQLLeadRepository } from '../repositories/MySQLLeadRepository';
import { NotificationService } from '../../../Notificaciones/Infraestructure/services/NotificationService';
import { SendTokenToLead } from '../../Application/useCases/SendTokenToLead';
import db from '../../../config/db';

export class LeadController {
  static async registerLead(req: Request, res: Response) {
    const { email, firstName, lastName, phone } = req.body;

    const leadRepository = new MySQLLeadRepository();
    const registerLead = new RegisterLead(leadRepository);

    try {
      await registerLead.execute(email, firstName, lastName, phone);
      res.status(201).json({ message: 'Lead registrado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el lead' });
    }
  }

  static async sendTokenToLead(req: Request, res: Response) {
    const { email, password } = req.body;
    
    const leadRepository = new MySQLLeadRepository();
    const notificationService = new NotificationService();
    const sendTokenToLead = new SendTokenToLead(leadRepository, notificationService);

    try {
      const { lead, hashedPassword } = await sendTokenToLead.execute(email, password);
      res.status(200).json({ message: 'Token enviado por WhatsApp.', lead, hashedPassword });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al enviar el token.' });
      }
    }
  }

  async deleteLeadByUuid(uuid: string): Promise<void> {
    const query = 'DELETE FROM leads WHERE uuid = ?';
    await db.query(query, [uuid]);
  }
}
