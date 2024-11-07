import {Lead} from '../../Domain/models/Lead'; 

export interface LeadRepository {
  createLead(lead: Lead): Promise<void>;
  findLeadByEmail(email: string): Promise<Lead | null>
  findLeadByUuid(uuid: string): Promise<Lead | null>; 
}



