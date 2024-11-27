import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import pooling

load_dotenv()

def connect_to_database():
    try:
        pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_name="mypool",
            pool_size=5,
            host=os.getenv("DB_HOST"),
            port=int(os.getenv("DB_PORT" )),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        print("✔️ Conectado a la base de datos MySQL")
        return pool

    except mysql.connector.Error as err:
        print(f"❌ Error al conectar a la base de datos: {err}")
        return None
