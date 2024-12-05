import { Veterinario } from "../Entities/Veterinario"; 

export interface VeterinarioRepository {
  save(user: Veterinario): Promise<void>;
  findAll(): Promise<Veterinario[]>;
  findById(id: string): Promise<Veterinario | null>;
  findByEmail(email: string): Promise<Veterinario | null>;
  update(id: string, veterinario: Veterinario): Promise<void>; 
  deleteById(id: string): Promise<void>;
}

