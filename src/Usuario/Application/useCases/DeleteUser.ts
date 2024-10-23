import { DeleteUserRepository } from '../../Domain/repositories/DeleteUserRepository';

export class DeleteUser {
  constructor(private userRepository: DeleteUserRepository) {}

  async execute(uuid: string): Promise<void> {
    await this.userRepository.deleteUser(uuid);
  }
}
