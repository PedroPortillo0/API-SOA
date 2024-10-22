import { Lead } from '../../Domain/models/Lead';
import { v4 as uuidv4 } from 'uuid';
import { LeadRepository } from '../../Domain/repositories/LeadRepository';

export class RegisterLead {
  constructor(private leadRepository: LeadRepository) {}

  async execute(email: string, firstName: string, lastName: string, phone: string) {
    const uuid = uuidv4();
    const lead = new Lead(
      0,             
      uuid,
      email,
      firstName,
      lastName,
      phone,
      new Date()     
    );

    await this.leadRepository.createLead(lead);
  }
}
