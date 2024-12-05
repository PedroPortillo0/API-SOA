from abc import ABC, abstractmethod
from typing import List, Optional
from HistorialDeVacunacion.Domain.Entities.Vacunacion import Vacunacion


class VacunacionRepository(ABC):
    @abstractmethod
    def create(self, vacunacion: Vacunacion) -> None:
        """Crea un nuevo registro de mascota."""
        pass

    @abstractmethod
    def get_by_id(self, id: str) -> Optional[Vacunacion]:
        """Obtiene una mascota por su ID."""
        pass

    @abstractmethod
    def get_all(self) -> List[Vacunacion]:
        """Obtiene una lista de todas las mascotas."""
        pass

