import { Lead } from '../../Domain/models/Lead';
import { v4 as uuidv4 } from 'uuid';
import { LeadRepository } from '../../Domain/repositories/LeadRepository';
import { EventPublisher } from '../../Domain/repositories/EventPublisher';

export class RegisterLead {
    constructor(
        private leadRepository: LeadRepository,
        private eventPublisher: EventPublisher
    ) {}

    async execute(email: string, firstName: string, lastName: string, phone: string) {
        const uuid = uuidv4();  
        const lead = new Lead(0, uuid, email, firstName, lastName, phone, new Date());
        
        // Crear el lead en el repositorio
        await this.leadRepository.createLead(lead);   
        
        // Publicar el evento
        await this.eventPublisher.publishEvent({
            type: 'LeadCreated',
            data: lead
        });
    }
}
