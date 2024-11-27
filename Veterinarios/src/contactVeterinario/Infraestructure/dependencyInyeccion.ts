import { pool } from "../../_config/db.config";

import { SaveContactVeterinario } from "../Application/use-case/SaveContactVeterinario";
import { FindContactByEmail } from "../Application/use-case/FindContactVeterinarioByEmail"; 
import { FindContactById } from "../Application/use-case/FindContactVeterinarioById"; 

import { SaveContactVeterinarioController } from "./controllers/SaveContactVeterinarioController";
import { FindContactByEmailController } from "./controllers/findContactVeterinarioByEmailController"; 
import { FindContactByIdController } from "./controllers/FindContactVeterinarioByIdController";

import { MySQLContactRepository } from "./persistence/MysqlContactVeterinarioRepository";
import { rabbitmqEventPublisher } from "../../_shared/Infraestructure/eventPublishers/rabbitmqEventPublisher"; 

// Repositorio
const contactVeterinarioRepository = new MySQLContactRepository(pool);

// Casos de uso
const saveContactVeterinario = new SaveContactVeterinario(contactVeterinarioRepository, rabbitmqEventPublisher);
const findContactByEmail = new FindContactByEmail(contactVeterinarioRepository);
const findContactById = new FindContactById(contactVeterinarioRepository);

// Controladores
const saveContactVeterinarioController = new SaveContactVeterinarioController(saveContactVeterinario);
const findContactByEmailController = new FindContactByEmailController(findContactByEmail);
const findContactByIdController = new FindContactByIdController(findContactById);

export {
    contactVeterinarioRepository,
    saveContactVeterinarioController,
    findContactByEmailController,
    findContactByIdController,
};
