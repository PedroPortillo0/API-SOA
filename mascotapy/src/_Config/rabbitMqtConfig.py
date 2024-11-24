import os
import pika

def create_rabbitmq_connection():
    try:
        # Leer la URL de RabbitMQ desde las variables de entorno
        rabbitmq_url = os.getenv("RABBITMQ_URL")
        if not rabbitmq_url:
            raise ValueError("La variable de entorno RABBITMQ_URL no está definida.")

        # Establecer la conexión
        connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
        print("✔️ Conexión establecida con RabbitMQ")
        return connection

    except Exception as e:
        print(f"❌ Error al conectar a RabbitMQ: {e}")
        return None

def create_rabbitmq_channel():
    try:
        # Crear conexión y canal
        connection = create_rabbitmq_connection()
        if not connection:
            raise ValueError("No se pudo crear la conexión a RabbitMQ.")
        
        channel = connection.channel()
        print("✔️ Canal creado con RabbitMQ")
        return channel  # Devolver solo el canal

    except Exception as e:
        print(f"❌ Error al crear el canal de RabbitMQ: {e}")
        return None