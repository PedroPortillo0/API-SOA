from Alimentacion.Domain.Entities.AlimentacionMascota import Alimentacion
from Alimentacion.Domain.Repositories.IAlimentacionRepository import IAlimentacionRepository


class CreateAlimentacionUseCase:
    def __init__(self, alimentacion_repository: IAlimentacionRepository):
        """
        Inicializa el caso de uso con el repositorio de alimentación.
        """
        self.alimentacion_repository = alimentacion_repository

    def execute(self, alimentacion: Alimentacion) -> bool:
        """
        Crea una nueva alimentación en la base de datos.
        """
        try:
            # Llama al método `create` del repositorio
            return self.alimentacion_repository.create(alimentacion)
        except Exception as e:
            # Si ocurre un error, lo registra y devuelve False
            print(f"❌ Error en el caso de uso: {e}")  # Depuración
            return False
