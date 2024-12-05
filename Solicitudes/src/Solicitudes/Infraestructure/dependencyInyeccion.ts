import { pool } from "../../_config/db.config";

import { MysqlSolicitudesRepository } from "./Persistence/MysqlSolicitudesRepository";

import { FindAllSolicitudes } from "../Application/use-case/FindAllSolicitued";
import { FindSolicitudesById } from "../Application/use-case/FindSolicitudesById";
import { SaveSolicitudes } from "../Application/use-case/SaveSolicitudes";
import { UpdateSolicitudes } from "../Application/use-case/UpdateSolicitudes";

import { FindAllSolicitudesController } from "./Controllers/FindAllSolicitudesController";
import { FindSolicitudesByIdController } from "./Controllers/FindSolicitudesById";
import { SaveSolicitudesController } from "./Controllers/SaveSolicitudesController";
import { UpdateSolicitudesController } from "./Controllers/UpdateSolicitudes";

const mysqlSolicitudesRepository = new MysqlSolicitudesRepository(pool);
const findAllSolicitudes = new FindAllSolicitudes(mysqlSolicitudesRepository);
const findSolicitudesById = new FindSolicitudesById(mysqlSolicitudesRepository);
const saveSolicitudes = new SaveSolicitudes(mysqlSolicitudesRepository);
const updateSolicitudes = new UpdateSolicitudes(mysqlSolicitudesRepository);

const findAllSolicitudesController = new FindAllSolicitudesController(findAllSolicitudes);
const findSolicitudesByIdController = new FindSolicitudesByIdController(findSolicitudesById);
const saveSolicitudesController = new SaveSolicitudesController(saveSolicitudes);
const updateSolicitudesController = new UpdateSolicitudesController(updateSolicitudes);

export {
    findAllSolicitudesController,
    findSolicitudesByIdController,
    saveSolicitudesController,
    updateSolicitudesController 
}