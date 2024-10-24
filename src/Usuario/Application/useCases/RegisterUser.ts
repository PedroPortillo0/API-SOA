import bcrypt from 'bcrypt';
import { LeadRepository } from '../../../Lead/Domain/repositories/LeadRepository';
import { UserRepository } from '../../Domain/repositories/UserRepository';
import { NotificationService } from '../../../Notificaciones/Infraestructure/services/NotificationService';

export class RegisterUser {
  constructor(
    private leadRepository: LeadRepository,
    private userRepository: UserRepository,
    private notificationService: NotificationService
  ) {}

  async execute(email: string, password: string) {
    // Buscar el lead por el correo
    const lead = await this.leadRepository.findLeadByEmail(email);

    if (!lead) {
      throw new Error('No se encontró el lead asociado a este correo.');
    }

    // Generar token y hash para la contraseña
    // const token = Math.floor(100000 + Math.random() * 900000).toString();    
    // Guardar el token asociado al lead (puedes asociar el token a la tabla de tokens si es necesario)
    // await this.userRepository.saveTokenByUuid(lead.uuid, token);
    // await this.notificationService.sendWhatsAppNotification(token);

    return { message: 'Token enviado al número registrado.' };
  }
}
