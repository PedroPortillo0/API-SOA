from typing import List, Optional
from Alimentacion.Domain.Entities.AlimentacionMascota import Alimentacion
from mysql.connector.pooling import MySQLConnectionPool


class AlimentacionRepository:
    def __init__(self, db_pool: MySQLConnectionPool):
        """
        Inicializa el repositorio con un pool de conexiones a MySQL.
        """
        self.db_pool = db_pool

    def create(self, alimentacion: Alimentacion) -> bool:
        query = """
        INSERT INTO alimentacion (id, tipo_alimento, nombre_alimento, cantidad, pets_id, fecha_alimentacion)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            alimentacion.id,
            alimentacion.tipo_alimento,
            alimentacion.nombre_alimento,
            alimentacion.cantidad,
            alimentacion.mascota_id,
            alimentacion.fecha_alimentacion
        )

        connection = self.db_pool.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, values)
                connection.commit()
                print("✅ Registro creado en la base de datos.")  # Depuración
                return True  # Devuelve True si todo salió bien
        except Exception as e:
            print(f"❌ Error en la consulta SQL: {e}")  # Depuración
            return False  # Devuelve False si ocurre un error
        finally:
            connection.close()


    def get_by_id(self, alimentacion_id: str) -> Optional[Alimentacion]:
        """
        Obtiene un registro de alimentación por su ID.
        """
        query = "SELECT * FROM alimentacion WHERE id = %s"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, (alimentacion_id,))
                row = cursor.fetchone()

            if not row:
                return None

            return Alimentacion(
                id=row["id"],
                tipo_alimento=row["tipo_alimento"],
                nombre_alimento=row["nombre_alimento"],
                cantidad=row["cantidad"],
                mascota_id=row["pets_id"],
                fecha_alimentacion=row["fecha_alimentacion"]
            )
        except Exception as e:
            print(f"Error al obtener registro por ID: {e}")  # Depuración
            return None
        finally:
            connection.close()

    def get_all(self) -> List[Alimentacion]:
        """
        Obtiene todos los registros de alimentación en la base de datos.
        """
        query = "SELECT * FROM alimentacion"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query)
                rows = cursor.fetchall()

            return [
                Alimentacion(
                    id=row["id"],
                    tipo_alimento=row["tipo_alimento"],
                    nombre_alimento=row["nombre_alimento"],
                    cantidad=row["cantidad"],
                    mascota_id=row["pets_id"],
                    fecha_alimentacion=row["fecha_alimentacion"]
                )
                for row in rows
            ]
        except Exception as e:
            print(f"Error al obtener todos los registros: {e}")  # Depuración
            return []
        finally:
            connection.close()
