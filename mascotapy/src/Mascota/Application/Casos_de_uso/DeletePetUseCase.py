from Mascota.Domain.Repositories.IPetRepository import IPetRepository

class DeletePetUseCase:
    def __init__(self, repository: IPetRepository):
        self.repository = repository

    def execute(self, pet_id: str) -> None:
        """Elimina una mascota utilizando el repositorio."""
        if not self.repository.get_by_id(pet_id):
            raise ValueError(f"❌ Mascota con ID '{pet_id}' no encontrada.")
        
        self.repository.delete(pet_id)
        print(f"✔️ Mascota con ID '{pet_id}' eliminada correctamente.")
