import { Request, Response } from 'express';
import { CreateToken } from '../../Application/UseCases/CreateToken';
import { ITokenRepository } from '../../Domain/Repositories/ITokenRepository';

export class TokenController {
    constructor(private createTokenUseCase: CreateToken, private tokenRepository: ITokenRepository) {}

    async createToken(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'userId es requerido' });
            }

            const token = await this.createTokenUseCase.execute(userId);
            return res.status(201).json(token);
        } catch (error) {
            console.error('Error al crear token:', error);
            return res.status(500).json({ message: 'Error al crear el token' });
        }
    }

    async verifyToken(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, token } = req.body;
            if (!userId || !token) {
                return res.status(400).json({ message: 'userId y token son requeridos' });
            }

            const isValid = await this.tokenRepository.verifyToken(userId, token);
            if (isValid) {
                return res.status(200).json({ message: 'Token verificado con éxito' });
            } else {
                return res.status(401).json({ message: 'Token inválido' });
            }
        } catch (error) {
            console.error('Error al verificar token:', error);
            return res.status(500).json({ message: 'Error al verificar el token' });
        }
    }

    async markTokenAsUsed(req: Request, res: Response): Promise<Response> {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ message: 'El token es requerido' });
            }

            await this.tokenRepository.markAsUsed(token);
            return res.status(200).json({ message: 'Token marcado como usado' });
        } catch (error) {
            console.error('Error al marcar token como usado:', error);
            return res.status(500).json({ message: 'Error al marcar el token como usado' });
        }
    }
}
