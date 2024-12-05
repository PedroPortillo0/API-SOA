from typing import List, Optional
from Mascota.Domain.Entities.Pet import Pet
from mysql.connector.pooling import MySQLConnectionPool


class PetRepository:
    def __init__(self, db_pool: MySQLConnectionPool):
        """
        Inicializa el repositorio con un pool de conexiones a MySQL.
        """
        self.db_pool = db_pool

    def create(self, pet: Pet) -> None:
        """
        Crea una nueva mascota en la base de datos.
        """
        query = """
            INSERT INTO pets (id, nombre, species, breed, birth_date, weight, height, gender, allergies, sterilized, user_id, image_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            pet.id, pet.name, pet.species, pet.breed, pet.birth_date, pet.weight,
            pet.height, pet.gender, pet.allergies, pet.sterilized, pet.user_id, pet.image_url
        )
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, values)
                connection.commit()
        finally:
            connection.close()

    def exists(self, pet_id: str) -> bool:
        """
        Verifica si una mascota con el ID dado existe en la base de datos.
        """
        query = "SELECT COUNT(*) AS count FROM pets WHERE id = %s"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, (pet_id,))
                result = cursor.fetchone()
                return result["count"] > 0
        except Exception as e:
            print(f"Error al verificar si la mascota existe: {e}")
            return False
        finally:
            connection.close()

    def update(self, pet_id: str, pet_data: dict) -> None:
        """
        Actualiza una mascota por su ID.
        """
        fields = ", ".join([f"{key} = %s" for key in pet_data.keys()])
        values = list(pet_data.values())
        query = f"""
            UPDATE pets
            SET {fields}
            WHERE id = %s
        """
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, values + [pet_id])
                connection.commit()
        finally:
            connection.close()

    def delete(self, pet_id: str) -> None:
        """
        Elimina una mascota por su ID.
        """
        query = "DELETE FROM pets WHERE id = %s"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (pet_id,))
                connection.commit()
        finally:
            connection.close()

    def get_by_id(self, pet_id: str) -> Optional[Pet]:
        """
        Obtiene una mascota por su ID.
        """
        query = "SELECT * FROM pets WHERE id = %s"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, (pet_id,))
                row = cursor.fetchone()

            if not row:
                return None

            return Pet(
                id=row["id"],
                name=row["nombre"],
                species=row["species"],
                breed=row["breed"],
                birth_date=row["birth_date"],
                weight=row["weight"],
                height=row["height"],
                gender=row["gender"],
                allergies=row["allergies"],
                sterilized=row["sterilized"],
                user_id=row["user_id"],
                image_url=row["image_url"]
            )
        finally:
            connection.close()

    def get_all(self) -> List[Pet]:
        """
        Obtiene todas las mascotas registradas en la base de datos.
        """
        query = "SELECT * FROM pets"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query)
                rows = cursor.fetchall()

            return [
                Pet(
                    id=row["id"],
                    name=row["nombre"],
                    species=row["species"],
                    breed=row["breed"],
                    birth_date=row["birth_date"],
                    weight=row["weight"],
                    height=row["height"],
                    gender=row["gender"],
                    allergies=row["allergies"],
                    sterilized=row["sterilized"],
                    user_id=row["user_id"],
                    image_url=row["image_url"]
                )
                for row in rows
            ]
        finally:
            connection.close()

    def get_by_name(self, name: str) -> List[Pet]:
        """
        Obtiene todas las mascotas que coincidan con el nombre proporcionado.
        """
        query = "SELECT * FROM pets WHERE nombre = %s"
        connection = self.db_pool.get_connection()
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(query, (name,))
                rows = cursor.fetchall()

            return [
                Pet(
                    id=row["id"],
                    name=row["nombre"],  
                    species=row["species"],
                    breed=row["breed"],
                    birth_date=row["birth_date"],
                    weight=row["weight"],
                    height=row["height"],
                    gender=row["gender"],
                    allergies=row["allergies"],
                    sterilized=row["sterilized"],
                    user_id=row["user_id"],
                    image_url=row["image_url"],
                )
                for row in rows
            ]
        finally:
            connection.close()
