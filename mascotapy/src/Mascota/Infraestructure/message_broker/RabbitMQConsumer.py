import json
import pika
from Mascota.Domain.Entities.Pet import Pet
from Mascota.Domain.Repositories.IPetRepository import IPetRepository


class RabbitMQPetConsumer:
    def __init__(self, channel: pika.adapters.blocking_connection.BlockingChannel, pet_repository: IPetRepository):
        """
        Inicializa el consumidor de RabbitMQ.
        :param channel: Canal de RabbitMQ ya conectado.
        :param pet_repository: Repositorio para manejar las operaciones con mascotas.
        """
        self.channel = channel
        self.pet_repository = pet_repository

    def start_consuming(self):
        """
        Inicia el consumo de mensajes desde la cola 'service_pet'.
        """
        queue = "service_pet"

        try:
            # Declarar la cola en RabbitMQ (asegurar que existe)
            self.channel.queue_declare(queue=queue, durable=True)
            print(f"✔️ Cola '{queue}' declarada o verificada con éxito.")

            # Definir el callback para procesar mensajes
            def callback(ch, method, properties, body):
                try:
                    # Deserializar el mensaje JSON recibido
                    event_payload = json.loads(body)
                    print("📥 Payload recibido:", event_payload)

                    # Validar que los campos obligatorios estén presentes
                    if not event_payload.get("id") or not event_payload.get("name") or not event_payload.get("species") or not event_payload.get("userId"):
                        raise ValueError("❌ Faltan campos obligatorios en el evento.")

                    # Crear la nueva mascota con todos los campos necesarios
                    pet = Pet(
                        id=event_payload.get("id"),  # Pasar el 'id' desde el payload
                        name=event_payload.get("name"),
                        species=event_payload.get("species"),
                        breed=event_payload.get("breed"),
                        birth_date=event_payload.get("birth_date"),
                        weight=float(event_payload.get("weight", 0.0)),  # Convertir weight a float, con valor por defecto 0.0 si no existe
                        height=float(event_payload.get("height", 0.0)),  # Convertir height a float, con valor por defecto 0.0 si no existe
                        gender=event_payload.get("gender"),
                        allergies=event_payload.get("allergies"),
                        sterilized=event_payload.get("sterilized") == 'true',  # Convertir a booleano
                        user_id=event_payload.get("userId"),  # Asegúrate de que el campo userId esté presente
                        image_url=event_payload.get("imageUrl")  # Image URL si está presente
                    )

                    # Llamar al repositorio para almacenar la mascota
                    self.pet_repository.create(pet)
                    print(f"✔️ Mascota '{pet.name}' guardada exitosamente.")

                except ValueError as e:
                    print(f"❌ Error al procesar el mensaje: {str(e)}")
                except Exception as e:
                    print(f"❌ Error desconocido al procesar el mensaje: {str(e)}")

                # Confirmar que el mensaje ha sido procesado
                ch.basic_ack(delivery_tag=method.delivery_tag)

            # Iniciar el consumo de mensajes
            self.channel.basic_consume(queue=queue, on_message_callback=callback)
            print("✔️ Esperando mensajes en la cola. Para salir presiona CTRL+C.")
            self.channel.start_consuming()

        except Exception as e:
            print(f"❌ Error al iniciar el consumidor: {str(e)}")
