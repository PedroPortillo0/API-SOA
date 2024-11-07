// Infrastructure/MongoDB/Repositories/TokenRepository.ts
import { Token } from "../../Domain/Entities/Token";
import { ITokenRepository } from "../../Domain/Repositories/ITokenRepository";
import TokenModel from "../Schemas/TokenSchema";

export class MongoTokenRepository implements ITokenRepository {
  async save(token: Token): Promise<void> {
    const tokenDocument = new TokenModel({
      token: token.token,
      createdAt: token.createdAt,
      isUsed: token.isUsed,
      expiresAt: token.expiresAt,
    });
    await tokenDocument.save();
  }
}
