import { Token } from "../Entities/Token";

export interface ITokenRepository {
  save(token: Token): Promise<void>;
}
