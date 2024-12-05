import { pool } from "../../_config/db.config";

import { SaveCitasMascotas } from "../Application/use-case/SaveCitasMascotas";
import { FindAllCitasMascotas } from "../Application/use-case/findAllCitasMascotas"; 
import { FindCitasMascotasById } from "../Application/use-case/findCitasMascotasById";
import { UpdateCitasMascotas } from "../Application/use-case/UpdateCitasMascotas";

import { SaveCitasMascotaController } from "./Controllers/SaveCitasMascotaController";
import { FindAllCitasMascotasController } from "./Controllers/FindAllCitasMascotasController";
import { FindCitasMascotaByIdController } from "./Controllers/FindCitasMascotasById";
import { UpdateCitasMascotasController } from "./Controllers/UpdateCitasMascotasController";

import { MysqlCitasMascotasRepository } from "./Persistence/MysqlCitasMascotasRepository"; 

const mysqlCitasMascotasRepository = new MysqlCitasMascotasRepository(pool);

const saveCitasMascotas = new SaveCitasMascotas(mysqlCitasMascotasRepository);
const findAllCitasMascotas = new FindAllCitasMascotas(mysqlCitasMascotasRepository);
const findCitasMascotasById = new FindCitasMascotasById(mysqlCitasMascotasRepository);
const updateCitasMascotas = new UpdateCitasMascotas(mysqlCitasMascotasRepository);

const saveCitasMascotaController = new SaveCitasMascotaController(saveCitasMascotas);
const findAllCitasMascotasController = new FindAllCitasMascotasController(findAllCitasMascotas);
const findCitasMascotaByIdController = new FindCitasMascotaByIdController(findCitasMascotasById);
const updateCitasMascotasController = new UpdateCitasMascotasController(updateCitasMascotas);

export {
    saveCitasMascotaController,
    findAllCitasMascotasController,
    findCitasMascotaByIdController,
    updateCitasMascotasController,
};