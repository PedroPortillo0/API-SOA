  import { User } from "../entities/User";

  export interface UserRepository {
    save(user: User): Promise<void>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<void>; 
    deleteById(id: string): Promise<void>;
  }

