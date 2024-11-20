import { Pet } from '../../Domain/entities/Pet';
import { Pool } from 'mysql2/promise';

export class PetRepository {
    constructor(private db: Pool) {}

    // Crear una nueva mascota
    async create(pet: Pet): Promise<void> {
        const query = `
            INSERT INTO pets (id, name, species, breed, age, weight, height, gender, vaccines, allergies, sterilized, user_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await this.db.execute(query, [
            pet.id, pet.name, pet.species, pet.breed, pet.age, pet.weight,
            pet.height, pet.gender, pet.vaccines, pet.allergies, pet.sterilized, pet.userId
        ]);
    }

    // Actualizar una mascota por su ID
    async update(id: string, pet: Partial<Pet>): Promise<void> {
        const fields = Object.keys(pet).map(field => `${field} = ?`).join(', ');
        const values = Object.values(pet);
        const query = `
            UPDATE pets
            SET ${fields}
            WHERE id = ?
        `;
        await this.db.execute(query, [...values, id]);
    }

    // Eliminar una mascota por su ID
    async delete(id: string): Promise<void> {
        const query = `DELETE FROM pets WHERE id = ?`;
        await this.db.execute(query, [id]);
    }

    // Obtener una mascota por su ID
    async getById(id: string): Promise<Pet | null> {
        const query = `SELECT * FROM pets WHERE id = ?`;
        const [rows]: [any[], any] = await this.db.execute(query, [id]);
    
        if (rows.length === 0) return null;
    
        const row = rows[0];
        return new Pet(
            row.id,
            row.name,
            row.species,
            row.breed,
            row.age,
            row.weight,
            row.height,
            row.gender,
            row.vaccines,
            row.allergies,
            row.sterilized,
            row.user_id
        );
    }
    

    // Obtener todas las mascotas
    async getAll(): Promise<Pet[]> {
        const query = `SELECT * FROM pets`;
    
        const [rows]: [any[], any] = await this.db.execute(query);
    
        return rows.map((row) => new Pet(
            row.id,
            row.name,
            row.species,
            row.breed,
            row.age,
            row.weight,
            row.height,
            row.gender,
            row.vaccines, 
            row.allergies,
            row.sterilized,
            row.user_id
        ));
    }
    
    

    // Obtener todas las mascotas de un usuario específico
    async getAllByUserId(userId: string): Promise<Pet[]> {
        const query = `SELECT * FROM pets WHERE user_id = ?`;
    
        const [rows]: [any[], any] = await this.db.execute(query, [userId]);
    
        return rows.map((row) => new Pet(
            row.id,
            row.name,
            row.species,
            row.breed,
            row.age,
            row.weight,
            row.height,
            row.gender,
            row.vaccines, 
            row.allergies,
            row.sterilized,
            row.user_id
        ));
    }
    
    
}
