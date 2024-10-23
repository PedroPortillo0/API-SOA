import { FindUserRepository } from '../../Domain/repositories/FindUserRepository';

export class GetAllUsers {
  constructor(private userRepository: FindUserRepository) {}

  async execute(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const users = await this.userRepository.findAllUsers(limit, offset);
    const total = await this.userRepository.countUsers();

    return { users, total };
  }
}
