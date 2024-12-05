from datetime import datetime
from HistorialDeVacunacion.Domain.Entities.Vacunacion import Vacunacion
from HistorialDeVacunacion.Domain.Repositories.VacunacionRepository import VacunacionRepository

class CreateVacunacionUseCase:
    def __init__(self, vacunacion_repository: VacunacionRepository):
        self.vacunacion_repository = vacunacion_repository

    def execute(self, id_mascota: str, fecha_vacunacion: str, vacuna: str, lote: str):
        # Crear una nueva instancia de Vacunacion
        nueva_vacunacion = Vacunacion(
            id_mascota=id_mascota,
            fecha_vacunacion=fecha_vacunacion,
            vacuna=vacuna,
            lote=lote,
            created_at=datetime.now()
        )
        
        # Guardar la nueva vacunacion en el repositorio
        self.vacunacion_repository.create(nueva_vacunacion)