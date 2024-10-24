import { Router } from 'express';
import { LeadController } from '../../Infraestructure/controllers/LeadController';


const router = Router();

// Ruta para registrar leads
router.post('/register', LeadController.registerLead);
router.post('/send-token', LeadController.sendTokenToLead);


export default router;
