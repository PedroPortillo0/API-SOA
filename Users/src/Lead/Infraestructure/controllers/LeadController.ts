import { Request, Response } from 'express';
import { RegisterLead } from '../../Application/useCases/RegisterLead';
import { PostgreSQLLeadRepository } from '../repositories/MySQLLeadRepository';
import  RabbitMQEventPublisher  from '../publishers//RabbitMQEventPublisher';

export class LeadController {
    static async registerLead(req: Request, res: Response) {
        const { email, firstName, lastName, phone } = req.body;

        const leadRepository = new PostgreSQLLeadRepository();
        const eventPublisher = new RabbitMQEventPublisher();
        const registerLead = new RegisterLead(leadRepository, eventPublisher);

        try {
            await registerLead.execute(email, firstName, lastName, phone);
            res.status(201).json({ message: 'Lead registrado con éxito' });
        } catch (error) {
            console.error("Error al registrar el lead:", error);
            res.status(500).json({ message: 'Error al registrar el lead' });
        }
    }
}
