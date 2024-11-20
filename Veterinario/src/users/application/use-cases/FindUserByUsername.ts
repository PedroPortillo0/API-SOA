import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class FindUserByUsername {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
