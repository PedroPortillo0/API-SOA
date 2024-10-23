import { User } from '../../Domain/models/User'

export interface UpdateUserRepository {
    updateUser(uuid: string, data: { name: string, email: string, password: string, phoneNumber: string }): Promise<User | null>;
  }