import { LeadRepository } from '../../Domain/repositories/LeadRepository';
import bcrypt from 'bcrypt';
import { NotificationService } from '../../../Notificaciones/Infraestructure/services/NotificationService';

export class SendTokenToLead {
  constructor(
    private leadRepository: LeadRepository,
    private notificationService: NotificationService
  ) {}

  async execute(email: string, password: string) {
    // Buscar el lead por email
    const lead = await this.leadRepository.findLeadByEmail(email);

    if (!lead) {
      throw new Error('No se encontró el lead con ese correo.');
    }

    // Hashear la contraseña proporcionada
    const hashedPassword = await bcrypt.hash(password, 10);
    // Guardar la contraseña hasheada en el lead temporalmente
    await this.leadRepository.updateLeadPassword(lead.uuid, hashedPassword);

    // Generar token
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar el token en la tabla correspondiente (relacionado con el lead)
    await this.leadRepository.saveTokenForLead(lead.uuid, token);

    // Enviar el token por WhatsApp
    await this.notificationService.sendWhatsAppNotification(token);

    // Retornar la contraseña hasheada para guardarla en el siguiente paso
    return { lead, hashedPassword };
  }
}

