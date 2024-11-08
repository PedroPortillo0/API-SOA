import { Token } from "../Entities/Token";

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findByUserId(userId: string): Promise<Token | null>;
  verifyToken(userId: string, token: string): Promise<boolean>;
  markAsUsed(token: string): Promise<void>;
}
