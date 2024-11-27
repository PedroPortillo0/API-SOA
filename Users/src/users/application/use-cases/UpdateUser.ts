import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, updatedData: Partial<User>): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.update(id, updatedData);
  }
}
