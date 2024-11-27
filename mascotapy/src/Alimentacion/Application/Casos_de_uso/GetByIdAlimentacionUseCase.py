from typing import Optional
from Alimentacion.Domain.Entities.AlimentacionMascota import Alimentacion
from Alimentacion.Domain.Repositories.IAlimentacionRepository import IAlimentacionRepository


class GetByIdAlimentacionUseCase:
    def __init__(self, alimentacion_repository: IAlimentacionRepository):
        self.alimentacion_repository = alimentacion_repository

    def execute(self, alimentacion_id: str) -> Optional[Alimentacion]:
        """
        Obtiene una alimentación por su ID.

        :param alimentacion_id: ID único de la alimentación.
        :return: Objeto Alimentacion si se encuentra, None en caso contrario.
        """
        return self.alimentacion_repository.get(alimentacion_id)
