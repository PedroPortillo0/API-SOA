import { createPool, Pool } from 'mysql2/promise';

export async function connectToDatabase(): Promise<Pool> {
    const pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log('✔️ Conectado a la base de datos MySQL');
    return pool;
}
