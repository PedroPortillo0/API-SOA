import { FindUserRepository } from '../../Domain/repositories/FindUserRepository';

export class GetUserByUuid {
  constructor(private userRepository: FindUserRepository) {}

  async execute(uuid: string) {
    const user = await this.userRepository.findUserByUuid(uuid);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }
}
