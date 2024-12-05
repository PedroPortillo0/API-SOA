from HistorialDeVacunacion.Domain.Repositories.VacunacionRepository import VacunacionRepository
from HistorialDeVacunacion.Domain.Entities.Vacunacion import Vacunacion
from typing import Optional

class FindVacunacionByIdUseCase:
    def __init__(self, vacunacion_repository: VacunacionRepository):
        self.vacunacion_repository = vacunacion_repository

    def execute(self, id: str) -> Optional[Vacunacion]:
        """Obtiene una vacunación por su ID desde el repositorio."""
        vacunacion = self.vacunacion_repository.get_by_id(id)
        if not vacunacion:
            raise ValueError(f"❌ Vacunación con ID '{id}' no encontrada.")
        return vacunacion