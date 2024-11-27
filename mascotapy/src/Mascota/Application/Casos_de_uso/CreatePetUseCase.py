from Mascota.Domain.Entities.Pet import Pet  
from Mascota.Domain.Repositories.IPetRepository import IPetRepository 

class CreatePetUseCase:
    def __init__(self, repository: IPetRepository):
        self.repository = repository

    def execute(self, pet: Pet) -> None:
        """Ejecuta la creación de una nueva mascota."""
        self.repository.create(pet)
        print(f"✔️ Mascota creada: {pet}")
