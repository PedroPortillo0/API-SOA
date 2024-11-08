import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { LeadRepository } from "../../../Lead/Domain/repositories/LeadRepository"; 
import { User } from "../../Domain/Models/User";
import { v4 as uuidv4 } from "uuid";

export class RegisterUser {
    constructor(
        private leadRepository: LeadRepository,
        private userRepository: IUserRepository
    ) {}
    

    async execute(email: string, password: string): Promise<User> {
        // Buscar si el lead existe por correo
        const lead = await this.leadRepository.findLeadByEmail(email);
        if (!lead) {
            throw new Error("Lead not found. Please register as a lead first.");
        }

        // Verificar si ya existe un usuario con ese correo
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        // Crear nuevo usuario a partir de los datos del lead
        const uuid = uuidv4();
        const newUser = new User(uuid, email, password);
        await this.userRepository.create(newUser);

        return newUser;
    }
}
