from datetime import datetime
import uuid

class Vacunacion:
    def __init__(
        self,
        id_mascota: str,  # Identificador de la mascota
        fecha_vacunacion: str,  # Fecha de la vacunación
        vacuna: str,  # Nombre de la vacuna
        lote: str,  # Lote de la vacuna
        created_at: datetime  # Fecha de creación del registro
    ):
        self.id = str(uuid.uuid4())  # Generar un UUID único para el id
        self.id_mascota = id_mascota
        self.fecha_vacunacion = fecha_vacunacion
        self.vacuna = vacuna
        self.lote = lote
        self.created_at = created_at