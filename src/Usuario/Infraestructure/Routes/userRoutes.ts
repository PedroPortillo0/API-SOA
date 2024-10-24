import { Router } from 'express';
import { UserController } from '../../Infraestructure/controllers/UserController';


const router = Router();

// Ruta para verificar el token
router.post('/verify-token', UserController.verifyUserToken);
export default router;
