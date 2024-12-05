import { pool } from "../../_config/db.config"; 

// casos de uso
import { SaveContactVeterinario } from "../Application/use-case/SaveContactVeterinario";
import { FindAllContactsVeterinario } from "../Application/use-case/FindAllContactsVeterinarios";
import { FindContactVeterinarioByEmail } from "../Application/use-case/FindContactVeterinarioByEmail";
import { FindContactVeterinarioById } from "../Application/use-case/FindContactVeterinarioById";
import { DeleteContacVeterinariotById } from "../Application/use-case/DeleteContactVeterinarioById";

//controllers
import { SaveContactVeterinarioController } from "./Controller/SaveContactVeterinarioController";
import { FindAllContactsVeterinarioController } from "./Controller/FindAllContactsVeterinarioController";
import { FindContactVeterinarioByEmailController } from "./Controller/FindContactVeterinarioByEmailController";
import { FindContactVeterinarioByIdController } from "./Controller/FindContactVeterinarioById";
import { DeleteContactVeterinarioByIdController } from "./Controller/DeleteContactVeterinarioByIdController";

//Persistencias
import { MysqlContactRepository } from "./Persistence/MysqlContactVeterinarioRepository";
import { rabbitmqEventPublisher } from "../../_shared/Infraestructure/eventPublishers/rabbitmqEventPublisher"; 


const mysqlContactRepository= new MysqlContactRepository(pool);

//implementacion de los casos de uso
const findContactVeterinarioById = new FindContactVeterinarioById(mysqlContactRepository);
const findContactVeterinarioByEmail = new FindContactVeterinarioByEmail(mysqlContactRepository);
const deleteContactById = new DeleteContacVeterinariotById(mysqlContactRepository);
const saveContactById = new SaveContactVeterinario(mysqlContactRepository, rabbitmqEventPublisher);
const findAllContactVeterinario = new FindAllContactsVeterinario(mysqlContactRepository);

//implementacion de los controladores
const saveContactVeterinarioController = new SaveContactVeterinarioController(saveContactById);
const findAllContactVeterinarioController = new FindAllContactsVeterinarioController(findAllContactVeterinario);
const findContactVeterinarioByIdController = new FindContactVeterinarioByIdController(findContactVeterinarioById);
const deleteContactVeterinarioController = new DeleteContactVeterinarioByIdController(deleteContactById);
const findContactVeterinarioByEmailController = new FindContactVeterinarioByEmailController(findContactVeterinarioByEmail);

export {
    mysqlContactRepository,
    saveContactVeterinarioController,
    findAllContactVeterinarioController,
    findContactVeterinarioByIdController,
    deleteContactVeterinarioController,
    findContactVeterinarioByEmailController,
  };