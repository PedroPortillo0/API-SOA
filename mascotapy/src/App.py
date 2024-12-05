import os
import threading
from flask import Flask, jsonify
from flask_cors import CORS
from _Config.DbConfig import connect_to_database
from Mascota.Infraestructure.Routes.petRoutes import pet_routes
from HistorialDeVacunacion.Infraestructure.Routes.VacunacionRoutes import vacunacion_routes
from Mascota.Infraestructure.Persistence.PetRepository import PetRepository
from Mascota.Infraestructure.message_broker.RabbitMQConsumer import RabbitMQPetConsumer
from _Config.rabbitMqtConfig import create_rabbitmq_channel

# Configurar el puerto desde las variables de entorno o usar un puerto predeterminado
PORT = int(os.getenv("PORT", 3003))

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS si es necesario

@app.route("/")
def health_check():
    return jsonify({"message": "Server is running"}), 200

# Registrar las rutas de mascotas
app.register_blueprint(pet_routes, url_prefix="/api/v3/pets")

# Registrar las rutas de vacunaciones
app.register_blueprint(vacunacion_routes, url_prefix="/api/v3/vacunaciones")




def start_rabbitmq_consumer():
    """Función para iniciar el consumidor RabbitMQ en un hilo separado."""
    try:
        # Conectar a la base de datos
        db_pool = connect_to_database()
        pet_repository = PetRepository(db_pool)

        # Conexión a RabbitMQ y creación del canal
        rabbit_channel = create_rabbitmq_channel()

        # Crear instancia del consumidor
        rabbit_consumer = RabbitMQPetConsumer(rabbit_channel, pet_repository)

        # Iniciar el consumidor para procesar mensajes
        rabbit_consumer.start_consuming()
    except Exception as error:
        print("Error inicializando RabbitMQ Consumer:", error)

if __name__ == "__main__":
    try:
        # Iniciar el consumidor RabbitMQ en un hilo separado
        consumer_thread = threading.Thread(target=start_rabbitmq_consumer, daemon=True)
        consumer_thread.start()

        # Iniciar el servidor Flask
        print(f"✔️ Servidor corriendo en: http://localhost:{PORT}")
        app.run(port=PORT, debug=True)

    except Exception as error:
        print("Error inicializando el servidor o RabbitMQ Consumer:", error)
