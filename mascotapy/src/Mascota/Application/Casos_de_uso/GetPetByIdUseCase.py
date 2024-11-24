from Mascota.Domain.Repositories.IPetRepository import IPetRepository
from Mascota.Domain.Entities.Pet import Pet
from typing import Optional

class GetPetByIdUseCase:
    def __init__(self, repository: IPetRepository):
        self.repository = repository

    def execute(self, pet_id: str) -> Optional[Pet]:
        """Obtiene una mascota por su ID desde el repositorio."""
        pet = self.repository.get_by_id(pet_id)
        if not pet:
            raise ValueError(f"❌ Mascota con ID '{pet_id}' no encontrada.")
        return pet
