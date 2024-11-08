import { User } from "../Models/User";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    updateUserFromLead(uuid: string, leadData: any): Promise<void>;
    verifyUser(uuid: string): Promise<void>;
    findByUuid(uuid: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
