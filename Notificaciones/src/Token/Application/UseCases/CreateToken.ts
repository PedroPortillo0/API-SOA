import { Token } from "../../Domain/Entities/Token";
import { ITokenRepository } from "../../Domain/Repositories/ITokenRepository";

export class CreateToken {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(): Promise<Token> {
    const newToken = new Token(Token.generateToken());
    await this.tokenRepository.save(newToken);
    return newToken;
  }
}
