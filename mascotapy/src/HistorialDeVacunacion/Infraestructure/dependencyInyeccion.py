from _Config.DbConfig import connect_to_database

from HistorialDeVacunacion.Application.use_case.createVacunacion import CreateVacunacionUseCase
from HistorialDeVacunacion.Application.use_case.findAllvacunacion import FindAllVacunacionUseCase
from HistorialDeVacunacion.Application.use_case.findVacunacionById import FindVacunacionByIdUseCase

from HistorialDeVacunacion.Infraestructure.Persistence.MysqlVacunacionRepository import MysqlVacunacionRepository

from HistorialDeVacunacion.Infraestructure.Controllers.createVacunacionController import CreateVacunacionController
from HistorialDeVacunacion.Infraestructure.Controllers.findAllvacunacionController import FindAllVacunacionController
from HistorialDeVacunacion.Infraestructure.Controllers.findVacunacionByIdController import FindVacunacionByIdController

# Configuración de la base de datos
db_pool = connect_to_database()
vacunacion_repository = MysqlVacunacionRepository(db_pool)

# Casos de uso
create_vacunacion_use_case = CreateVacunacionUseCase(vacunacion_repository)
find_all_vacunacion_use_case = FindAllVacunacionUseCase(vacunacion_repository)
find_vacunacion_by_id_use_case = FindVacunacionByIdUseCase(vacunacion_repository)

# Controladores
create_vacunacion_controller = CreateVacunacionController(create_vacunacion_use_case)
find_all_vacunacion_controller = FindAllVacunacionController(find_all_vacunacion_use_case)
find_vacunacion_by_id_controller = FindVacunacionByIdController(find_vacunacion_by_id_use_case)

# Exportar los objetos para su uso en las rutas o en la aplicación principal
__all__ = [
    "create_vacunacion_controller",
    "find_all_vacunacion_controller",
    "find_vacunacion_by_id_controller",
    "vacunacion_repository"
]
