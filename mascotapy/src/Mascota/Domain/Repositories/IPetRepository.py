from abc import ABC, abstractmethod
from typing import List, Optional
from Mascota.Domain.Entities.Pet import Pet  


class IPetRepository(ABC):
    @abstractmethod
    def create(self, pet: Pet) -> None:
        """Crea un nuevo registro de mascota."""
        pass

    @abstractmethod
    def update(self, id: str, pet: dict) -> None:
        """Actualiza un registro de mascota por su ID."""
        pass

    @abstractmethod
    def delete(self, id: str) -> None:
        """Elimina un registro de mascota por su ID."""
        pass

    @abstractmethod
    def get_by_id(self, id: str) -> Optional[Pet]:
        """Obtiene una mascota por su ID."""
        pass

    @abstractmethod
    def get_all(self) -> List[Pet]:
        """Obtiene una lista de todas las mascotas."""
        pass

    @abstractmethod
    def get_by_name(self, name: str) -> List[Pet]:
        """Obtiene una lista de mascotas por su nombre."""
        pass
