import { createRabbitMQChannel } from "../../_config/rabbitMQT.Config";
import { PetRepository } from "../percistence/PetRepository";
import { createPool } from "mysql2/promise";

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const petRepository = new PetRepository(pool);

export class RabbitMQConsumer {
    private channel: any;

    async init() {
        this.channel = await createRabbitMQChannel();
    }

    async consumeUserToPetQueue() {
        const queue = process.env.RABBITMQ_QUEUE_USER_TO_PET!;
        await this.channel.assertQueue(queue, { durable: true });

        console.log(`✔️ Consumiendo mensajes de la cola "${queue}"`);

        this.channel.consume(queue, async (msg: any) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                console.log("✔️ Mensaje recibido:", content);

                try {
                    // Crea la mascota en la base de datos
                    await petRepository.create({
                        id: content.id,
                        name: content.name,
                        species: content.species,
                        breed: content.breed,
                        age: content.age,
                        weight: content.weight,
                        height: content.height,
                        gender: content.gender,
                        vaccines: content.vaccines,
                        allergies: content.allergies,
                        sterilized: content.sterilized,
                        userId: content.userId, // Relación con el usuario
                    });

                    console.log(`✔️ Mascota creada con éxito: ${content.name}`);
                    this.channel.ack(msg); // Confirma el mensaje
                } catch (error) {
                    console.error("❌ Error al procesar el mensaje:", error);
                }
            }
        });
    }
}
