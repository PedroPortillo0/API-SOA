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
                    event_payload = json.loads(body)
                    print("📥 Payload recibido:", event_payload)

                    # Validar campos obligatorios
                    if not event_payload.get("name") or not event_payload.get("species") or not event_payload.get("userId"):
                        raise ValueError("❌ Faltan campos obligatorios en el evento.")

                    # Crear la nueva mascota
                    pet = Pet(
                        name=event_payload.get("name"),
                        species=event_payload.get("species"),
                        breed=event_payload.get("breed"),
                        birth_date=event_payload.get("birth_date"),
                        weight=event_payload.get("weight"),
                        height=event_payload.get("height"),
                        gender=event_payload.get("gender"),
                        vaccines=event_payload.get("vaccines"),
                        allergies=event_payload.get("allergies"),
                        sterilized=event_payload.get("sterilized"),
                        user_id=event_payload.get("userId"),
                        image_url=event_payload.get("imageUrl"),
                    )

                    # Guardar la mascota en la base de datos
                    self.pet_repository.create(pet)

                    # Confirmar el mensaje como procesado
                    ch.basic_ack(delivery_tag=method.delivery_tag)
                    print(f"✔️ Mascota creada y procesada correctamente: {pet}")

                except Exception as error:
                    print("❌ Error al procesar el mensaje de RabbitMQ:", error)
                    # Re-encolar el mensaje para que pueda ser procesado nuevamente
                    ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

            # Escuchar mensajes en la cola
            self.channel.basic_consume(queue=queue, on_message_callback=callback)

            print(f"📡 Escuchando mensajes en la cola: '{queue}'")
            self.channel.start_consuming()

        except Exception as e:
            print(f"❌ Error inicializando el consumidor de RabbitMQ: {e}")
