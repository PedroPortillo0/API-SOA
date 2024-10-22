import { UserRepository } from '../../Domain/repositories/UserRepository';

export class VerifyUserToken {
  constructor(private userRepository: UserRepository) {}

  async execute(uuid: string, token: string) {
    const userToken = await this.userRepository.findTokenByUuid(uuid);

    if (!userToken) {
      throw new Error('Token no encontrado');
    }

    const tokenCreatedAt = new Date(userToken.created_at);
    const currentTime = new Date();
    const timeDifference = (currentTime.getTime() - tokenCreatedAt.getTime()) / 1000;

    if (timeDifference > 120) {  // Token expira en 2 minutos
      throw new Error('El token ha expirado');
    }

    if (userToken.token !== token) {
      throw new Error('Token inválido');
    }

    await this.userRepository.verifyUserByUuid(uuid);

    return true;
  }
}
