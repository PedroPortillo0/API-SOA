import { MongoTokenRepository } from "../Repositories/TokenRepository";
import { CreateToken } from "../../Application/UseCases/CreateToken";

const tokenRepository = new MongoTokenRepository();
const createTokenUseCase = new CreateToken(tokenRepository);

export { createTokenUseCase };
