import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../Domain/repositories/UserRepository';
import { NotificationService } from '../../../Notificaciones/Infraestructure/services/NotificationService';
import { User } from '../../Domain/models/User';

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private notificationService: NotificationService
  ) {}

  async execute(email: string, password: string, phone: string) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    
    const user = new User(
      0, 
      uuid,
      email,
      hashedPassword,
      false, 
      new Date()
    );

    await this.userRepository.createUser(user);

    await this.userRepository.saveTokenByUuid(uuid, token);
    await this.notificationService.sendWhatsAppNotification(phone, token);

    return { uuid, token };
  }
}
