from HistorialDeVacunacion.Domain.Repositories.VacunacionRepository import VacunacionRepository

class FindAllVacunacionUseCase:
    def __init__(self, vacunacion_repository: VacunacionRepository):
        self.vacunacion_repository = vacunacion_repository

    def execute(self):
        # Obtener todas las vacunaciones del repositorio
        vacunaciones = self.vacunacion_repository.get_all()
        return vacunaciones