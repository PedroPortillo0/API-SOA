import { ContactVeterinario } from "../entities/ContactVeteriario";


export interface ContactVeterinarioRepository {
    save(ContactVeteriario: ContactVeterinario): Promise<void>;
    findAll(): Promise<ContactVeterinario[]>;
    findById(id: string): Promise<ContactVeterinario | null>;
    findByEmail(email: string): Promise<ContactVeterinario | null>;
    deleteById(id: string): Promise<void>;
  }