from Mascota.Domain.Repositories.IPetRepository import IPetRepository
from Mascota.Domain.Entities.Pet import Pet
from typing import List

class GetPetsByNameUseCase:
    def __init__(self, pet_repository):
        self.pet_repository = pet_repository

    def execute(self, name: str) -> List[Pet]:
        if not name:
            raise ValueError("El nombre no puede estar vacío.")
        return self.pet_repository.get_by_name(name)
