import {Lead} from '../../Domain/models/Lead'; 

export interface LeadRepository {
  createLead(lead: Lead): Promise<void>;
  findLeadByEmail(email: string): Promise<Lead | null>
  saveTokenForLead(uuid: string, token: string): Promise<void>
  findLeadByUuid(uuid: string): Promise<Lead | null>; // Agregar esta función
  updateLeadPassword(uuid: string, password: string): Promise<void>;
  deleteLeadByUuid(uuid: string): Promise<void>; // Declarar la función aquí

}

