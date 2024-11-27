from Mascota.Application.Casos_de_uso.CreatePetUseCase import CreatePetUseCase
from Mascota.Application.Casos_de_uso.DeletePetUseCase import DeletePetUseCase
from Mascota.Application.Casos_de_uso.GetAllPetsUseCase import GetAllPetsUseCase
from Mascota.Application.Casos_de_uso.GetPetByIdUseCase import GetPetByIdUseCase
from Mascota.Application.Casos_de_uso.GetPetByName import GetPetsByNameUseCase
from Mascota.Application.Casos_de_uso.UpdatePetUseCase import UpdatePetUseCase

from Mascota.Infraestructure.Persistence.PetRepository import PetRepository
from _Config.DbConfig import connect_to_database

from Mascota.Infraestructure.Controllers.CreatePetController import CreatePetController
from Mascota.Infraestructure.Controllers.DeletePetController import DeletePetController
from Mascota.Infraestructure.Controllers.GetAllPetsController import GetAllPetsController
from Mascota.Infraestructure.Controllers.GetPetByIdController import GetPetByIdController
from Mascota.Infraestructure.Controllers.GetPetByNamecontroller import GetPetsByNameController
from Mascota.Infraestructure.Controllers.UpdatePetController import UpdatePetController

# Configuración de la base de datos
db_pool = connect_to_database()
pet_repository = PetRepository(db_pool)

# Casos de uso
create_pet_use_case = CreatePetUseCase(pet_repository)
delete_pet_use_case = DeletePetUseCase(pet_repository)
get_all_pets_use_case = GetAllPetsUseCase(pet_repository)
get_pet_by_id_use_case = GetPetByIdUseCase(pet_repository)
get_pets_by_name_use_case = GetPetsByNameUseCase(pet_repository)
update_pet_use_case = UpdatePetUseCase(pet_repository)

# Controladores
create_pet_controller = CreatePetController(create_pet_use_case)
delete_pet_controller = DeletePetController(delete_pet_use_case)
get_all_pets_controller = GetAllPetsController(get_all_pets_use_case)
get_pet_by_id_controller = GetPetByIdController(get_pet_by_id_use_case)
get_pets_by_name_controller = GetPetsByNameController(get_pets_by_name_use_case)
update_pet_controller = UpdatePetController(update_pet_use_case)

# Exportar los objetos para su uso en las rutas o en la aplicación principal
__all__ = [
    "create_pet_controller",
    "delete_pet_controller",
    "get_all_pets_controller",
    "get_pet_by_id_controller",
    "get_pets_by_name_controller",
    "update_pet_controller",
    "pet_repository"
]
