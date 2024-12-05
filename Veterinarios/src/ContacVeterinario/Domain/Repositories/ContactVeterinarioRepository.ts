import { ContactVeterinario } from "../Entities/ContacVeterinario"; 

export interface ContactVeterinarioRepository {
  save(contact: ContactVeterinario): Promise<void>;
  findAll(): Promise<ContactVeterinario[]>;
  findById(id: string): Promise<ContactVeterinario | null>;
  findByEmail(email: string): Promise<ContactVeterinario | null>;
  deleteById(id: string): Promise<void>;
}
