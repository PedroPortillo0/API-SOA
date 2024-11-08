import { Router } from 'express';
import { CreateUserController } from '../Controllers/CreateUserController';
import { PostgresUserRepository } from '../Repositories/PostgresUserRepository';
import { RegisterUser } from '../../Application/UseCases/RegisterUser';
import { PostgreSQLLeadRepository } from '../../../Lead/Infraestructure/repositories/MySQLLeadRepository'; 

const userRouter = Router();
const userRepository = new PostgresUserRepository();
const leadRepository = new PostgreSQLLeadRepository(); 
const registerUserUseCase = new RegisterUser(leadRepository, userRepository);
const createUserController = new CreateUserController(registerUserUseCase);

userRouter.post('/createCredential', (req, res) => createUserController.handle(req, res));

export default userRouter;
