from Mascota.Domain.Repositories.IPetRepository import IPetRepository

class GetAllPetsUseCase:
    def __init__(self, repository: IPetRepository):
        self.repository = repository

    def execute(self):
        """Obtiene todas las mascotas desde el repositorio."""
        return self.repository.get_all()
