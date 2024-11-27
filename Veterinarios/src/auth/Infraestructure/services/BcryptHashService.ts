import bcrypt from "bcrypt";
import { HashService } from "../../Domain/services/HashService";

export class BcryptHashService implements HashService {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
