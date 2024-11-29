import { pool } from "../../_config/db.config";

import { FindAllVeterinario } from "../Application/use-case/FindAllVeterinario"; 
import { FindVeterinarioById } from "../Application/use-case/FindVeterinarioById"; 
import { FindVeterinarioByEmail } from "../Application/use-case/FindVeterinarioByEmail"; 
import { DeleteVeterinarioById } from "../Application/use-case/DeleteVeterinario"; 
import { UpdateVeterinario } from "../Application/use-case/UpdateVeterinario";


import { FindAllVeterinarioController } from "./Controllers/FindAllVeterinarioController"; 
import { FindVeterinarioByIdController } from "./Controllers/FindVeterinarioByIdController"; 
import { FindVeterinarioByEmailController } from "./Controllers/FindVeterinarioByEmailController"; 
import { DeleteVeterinarioByIdController } from "./Controllers/DeteleVeterinarioController"; 
import { UpdateVeterinarioController } from "./Controllers/UpdateVeterinarioController"; 

import { MysqlUserRepository } from "./Persistence/MysqlVeterinarioRepository";

const mysqlUserRepository = new MysqlUserRepository(pool);

const findAllVeterinario = new FindAllVeterinario(mysqlUserRepository);
const findVeterinarioById = new FindVeterinarioById(mysqlUserRepository);
const findVeterinarioByEmail = new FindVeterinarioByEmail(mysqlUserRepository);
const updateVeterinario = new UpdateVeterinario(mysqlUserRepository);
const deleteVeterinarioById = new DeleteVeterinarioById(mysqlUserRepository);

const findAllVeterinarioController = new FindAllVeterinarioController(findAllVeterinario);
const findVeterinarioByIdController = new FindVeterinarioByIdController(findVeterinarioById);
const findVeterinarioByEmailController = new FindVeterinarioByEmailController(findVeterinarioByEmail);
const deleteVeterinarioByIdController = new DeleteVeterinarioByIdController(deleteVeterinarioById );
const updateVeterinarioController = new UpdateVeterinarioController(mysqlUserRepository);


export {
  mysqlUserRepository,
    findAllVeterinarioController,
    findVeterinarioByIdController,
    findVeterinarioByEmailController,
    deleteVeterinarioByIdController,
    updateVeterinarioController,
  };