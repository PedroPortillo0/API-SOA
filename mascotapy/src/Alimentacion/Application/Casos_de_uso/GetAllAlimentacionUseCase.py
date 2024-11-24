from typing import List
from Alimentacion.Domain.Entities.AlimentacionMascota import Alimentacion
from Alimentacion.Domain.Repositories.IAlimentacionRepository import IAlimentacionRepository


class GetAllAlimentacionUseCase:
    def __init__(self, alimentacion_repository: IAlimentacionRepository):
        self.alimentacion_repository = alimentacion_repository

    def execute(self) -> List[Alimentacion]:
        """
        Obtiene todas las alimentaciones registradas.

        :return: Lista de objetos Alimentacion.
        """
        return self.alimentacion_repository.get_all()
