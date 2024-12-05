from typing import List, Optional
from mysql.connector.pooling import MySQLConnectionPool
from HistorialDeVacunacion.Domain.Entities.Vacunacion import Vacunacion
from HistorialDeVacunacion.Domain.Repositories.VacunacionRepository import VacunacionRepository

class MysqlVacunacionRepository(VacunacionRepository):
    def __init__(self, db_pool: MySQLConnectionPool):
        self.db_pool = db_pool

    def create(self, vacunacion: Vacunacion) -> None:
        query = """
            INSERT INTO Vacunacion (id, id_mascota, fecha_vacunacion, vacuna, lote, created_at)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            vacunacion.id, vacunacion.id_mascota, vacunacion.fecha_vacunacion,
            vacunacion.vacuna, vacunacion.lote, vacunacion.created_at
        )
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, values)
                connection.commit()
        finally:
            connection.close()

    def get_by_id(self, id: str) -> Optional[Vacunacion]:
        query = "SELECT * FROM Vacunacion WHERE id = %s"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, (id,))
                row = cursor.fetchone()
                if row:
                    return Vacunacion(
                        id=row["id"],
                        id_mascota=row["id_mascota"],
                        fecha_vacunacion=row["fecha_vacunacion"],
                        vacuna=row["vacuna"],
                        lote=row["lote"],
                        created_at=row["created_at"]
                    )
                return None
        finally:
            connection.close()

    def get_all(self) -> List[Vacunacion]:
        query = "SELECT * FROM Vacunacion"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query)
                rows = cursor.fetchall()
                return [
                    Vacunacion(
                        id=row["id"],
                        id_mascota=row["id_mascota"],
                        fecha_vacunacion=row["fecha_vacunacion"],
                        vacuna=row["vacuna"],
                        lote=row["lote"],
                        created_at=row["created_at"]
                    )
                    for row in rows
                ]
        finally:
            connection.close()