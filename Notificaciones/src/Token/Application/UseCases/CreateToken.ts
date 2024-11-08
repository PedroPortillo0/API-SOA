import { ITokenRepository } from '../../Domain/Repositories/ITokenRepository';
import { Token } from '../../Domain/Entities/Token';

export class CreateToken {
    constructor(private tokenRepository: ITokenRepository) {}

    async execute(userId: string): Promise<Token> {
        // Generar un token de 6 dígitos aleatorio
        const generatedToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Crear una instancia de Token
        const newToken = new Token(generatedToken, userId);

        // Guardar el token en la base de datos
        const createdToken = await this.tokenRepository.create(newToken);

        return createdToken;
    }
}
