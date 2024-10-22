import { Request, Response } from 'express';
import { RegisterLead } from '../../Application/useCases/RegisterLead';
import { MySQLLeadRepository } from '../repositories/MySQLLeadRepository';

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
}
