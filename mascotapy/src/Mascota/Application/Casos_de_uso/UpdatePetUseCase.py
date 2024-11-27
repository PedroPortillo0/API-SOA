from Mascota.Domain.Repositories.IPetRepository import IPetRepository

class UpdatePetUseCase:
    def __init__(self, repository: IPetRepository):
        self.repository = repository

    def execute(self, pet_id: str, data: dict) -> None:
        """Actualiza una mascota por su ID con los datos proporcionados."""
        pet = self.repository.get_by_id(pet_id)
        if not pet:
            raise ValueError(f"❌ Mascota con ID '{pet_id}' no encontrada.")
        
        self.repository.update(pet_id, data)
        print(f"✔️ Mascota con ID '{pet_id}' actualizada correctamente.")
