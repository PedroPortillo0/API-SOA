# class Alimentacion:
#     def __init__(
#         self,
#         id: str,
#         tipo_alimento: str,
#         nombre_alimento: str,
#         cantidad: float,
#         mascota_id: str,
#         fecha_alimentacion: str = None,
#     ):
#         self.id = id
#         self.tipo_alimento = tipo_alimento
#         self.nombre_alimento = nombre_alimento
#         self.cantidad = cantidad
#         self.mascota_id = mascota_id
#         self.fecha_alimentacion = fecha_alimentacion
import uuid
from datetime import datetime

class Alimentacion:
    def __init__(
        self,
        tipo_alimento: str,
        nombre_alimento: str,
        cantidad: float,
        mascota_id: str,
        id: str = None,
        fecha_alimentacion: str = None,
    ):
        self.id = id or str(uuid.uuid4())  # Generar un UUID automáticamente si no se proporciona
        self.tipo_alimento = tipo_alimento
        self.nombre_alimento = nombre_alimento
        self.cantidad = cantidad
        self.mascota_id = mascota_id
        self.fecha_alimentacion = fecha_alimentacion or datetime.now().isoformat()  # Generar la fecha actual si no se proporciona
