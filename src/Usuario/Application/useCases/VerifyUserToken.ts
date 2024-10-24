import { UserRepository } from '../../Domain/repositories/UserRepository';
import { LeadRepository } from '../../../Lead/Domain/repositories/LeadRepository';

export class VerifyUserToken {
  constructor(private userRepository: UserRepository, private leadRepository: LeadRepository) {}

  async execute(uuid: string, token: string) {
    // Verificar el token asociado con el lead
    const userToken = await this.userRepository.findTokenByUuid(uuid);

    if (!userToken) {
      throw new Error('Token no válido.');
    }

    if (userToken.token !== token) {
      throw new Error('Token inválido');
    }

    // Obtener los datos del lead
    const lead = await this.leadRepository.findLeadByUuid(uuid);

    if (!lead) {
      throw new Error('No se encontró el lead asociado a este token.');
    }

    // Verificar que el lead tenga una contraseña almacenada
    if (!lead.password) {
      throw new Error('No se encontró la contraseña asociada al lead.');
    }

    // Crear el nuevo usuario usando los datos del lead, incluyendo la contraseña almacenada temporalmente
    await this.userRepository.createUserFromLead(lead, lead.password);

    // Eliminar el lead de la tabla leads
    await this.leadRepository.deleteLeadByUuid(lead.uuid);
  }
}
