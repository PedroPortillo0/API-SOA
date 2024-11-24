# from Alimentacion.Application.Casos_de_uso.CreateAlimentacionUseCase import CreateAlimentacionUseCase
# from Alimentacion.Application.Casos_de_uso.GetAllAlimentacionUseCase import GetAllAlimentacionUseCase
# from Alimentacion.Application.Casos_de_uso.GetByIdAlimentacionUseCase import GetByIdAlimentacionUseCase

# from Alimentacion.Infraestructure.Persistence.AlimentacinoRepository import AlimentacionRepository
# from _Config.DbConfig import connect_to_database

# from Alimentacion.Infraestructure.Controllers.CreateAlimentacionController import CreateAlimentacionController
# from Alimentacion.Infraestructure.Controllers.GetAllAlimentacionController import GetAllAlimentacionController
# from Alimentacion.Infraestructure.Controllers.GetByIdAlimetacionController import GetByIdAlimentacionController

# # Configuración de la base de datos
# db_pool = connect_to_database()
# alimentacion_repository = AlimentacionRepository(db_pool)

# # Casos de uso
# create_alimentacion_use_case = CreateAlimentacionUseCase(alimentacion_repository)
# get_all_alimentacion_use_case = GetAllAlimentacionUseCase(alimentacion_repository)
# get_by_id_alimentacion_use_case = GetByIdAlimentacionUseCase(alimentacion_repository)

# # Controladores
# create_alimentacion_controller = CreateAlimentacionController(create_alimentacion_use_case)
# get_all_alimentacion_controller = GetAllAlimentacionController(get_all_alimentacion_use_case)
# get_by_id_alimentacion_controller = GetByIdAlimentacionController(get_by_id_alimentacion_use_case)

# # Exportar los objetos para su uso en las rutas o en la aplicación principal
# __all__ = [
#     "create_alimentacion_controller",
#     "get_all_alimentacion_controller",
#     "get_by_id_alimentacion_controller",
#     "alimentacion_repository"
# ]

from Alimentacion.Application.Casos_de_uso.CreateAlimentacionUseCase import CreateAlimentacionUseCase
from Alimentacion.Application.Casos_de_uso.GetAllAlimentacionUseCase import GetAllAlimentacionUseCase
from Alimentacion.Application.Casos_de_uso.GetByIdAlimentacionUseCase import GetByIdAlimentacionUseCase

from Alimentacion.Infraestructure.Persistence.AlimentacinoRepository import AlimentacionRepository
from _Config.DbConfig import connect_to_database

from Alimentacion.Infraestructure.Controllers.CreateAlimentacionController import CreateAlimentacionController
from Alimentacion.Infraestructure.Controllers.GetAllAlimentacionController import GetAllAlimentacionController
from Alimentacion.Infraestructure.Controllers.GetByIdAlimetacionController import GetByIdAlimentacionController

from Mascota.Infraestructure.Persistence.PetRepository import PetRepository

# Configuración de la base de datos
db_pool = connect_to_database()
alimentacion_repository = AlimentacionRepository(db_pool)
pet_repository = PetRepository(db_pool) 

# Casos de uso
create_alimentacion_use_case = CreateAlimentacionUseCase(alimentacion_repository)
get_all_alimentacion_use_case = GetAllAlimentacionUseCase(alimentacion_repository)
get_by_id_alimentacion_use_case = GetByIdAlimentacionUseCase(alimentacion_repository)

# Controladores
create_alimentacion_controller = CreateAlimentacionController(create_alimentacion_use_case, pet_repository)
get_all_alimentacion_controller = GetAllAlimentacionController(get_all_alimentacion_use_case)
get_by_id_alimentacion_controller = GetByIdAlimentacionController(get_by_id_alimentacion_use_case)

# Exportar los objetos para su uso en las rutas o en la aplicación principal
__all__ = [
    "create_alimentacion_controller",
    "get_all_alimentacion_controller",
    "get_by_id_alimentacion_controller",
    "alimentacion_repository"
]
