import { Router } from 'express';
import { LeadController } from '../../Infraestructure/controllers/LeadController';


const router = Router();

router.post('/register', LeadController.registerLead);

export default router;
