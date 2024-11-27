from abc import ABC, abstractmethod
from typing import List, Optional
from Alimentacion.Domain.Entities.AlimentacionMascota import Alimentacion  

class IAlimentacionRepository(ABC):
    @abstractmethod
    def post(self, alimentacion: Alimentacion) -> bool:
        """
        Guarda una nueva alimentación en el sistema.
        
        :param alimentacion: Objeto de tipo Alimentacion.
        :return: True si se guardó correctamente, False en caso contrario.
        """
        pass

    @abstractmethod
    def get(self, alimentacion_id: str) -> Optional[Alimentacion]:
        """
        Obtiene una alimentación por su ID.

        :param alimentacion_id: ID único de la alimentación.
        :return: Objeto Alimentacion si se encuentra, None en caso contrario.
        """
        pass

    @abstractmethod
    def get_all(self) -> List[Alimentacion]:
        """
        Obtiene todas las alimentaciones registradas.

        :return: Lista de objetos Alimentacion.
        """
        pass
