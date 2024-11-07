import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || "";

if (!uri) {
    throw new Error("Error: MONGO_URI no está definida. Verifica tu archivo .env.");
}

export async function testConnection(databaseName: string, collectionName: string) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log(`Conexión exitosa a MongoDB Atlas en la base de datos: ${databaseName}`);

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        const result = await collection.insertOne({ prueba: `Conexión exitosa a la colección ${collectionName}` });
        console.log("Documento insertado:", result);

    } catch (error) {
        console.error(`Error al conectar a la base de datos ${databaseName}:`, error);
    } finally {
        await client.close();
        console.log(`Conexión cerrada a la base de datos ${databaseName}`);
    }
}
