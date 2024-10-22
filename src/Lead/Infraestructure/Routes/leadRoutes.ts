import { Router } from 'express';
import { LeadController } from '../../Infraestructure/controllers/LeadController';


const router = Router();

// Ruta para registrar leads
router.post('/register', LeadController.registerLead);

export default router;
