import { UserRepository } from "../../../users/domain/repositories/UserRepository";
import { HashService } from "../../domain/services/HashService";
import { User } from "../../../users/domain/entities/User";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  async execute(identifier: string, password: string): Promise<User | null> {
    let user = await this.userRepository.findByUsername(identifier);
    if (!user) {
      user = await this.userRepository.findByEmail(identifier);
    }

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    if (!user.isVerified()) {
      throw new Error("Cuenta no verificada");
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.getPassword()
    );

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }
}
