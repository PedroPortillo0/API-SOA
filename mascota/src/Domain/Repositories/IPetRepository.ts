import { Pet } from '../entities/Pet';

export interface IPetRepository {
    create(pet: Pet): Promise<void>;
    update(id: string, pet: Partial<Pet>): Promise<void>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<Pet | null>;
    getAll(): Promise<Pet[]>;
    // findByUserId(userId: string): Promise<Pet[]>;
}
