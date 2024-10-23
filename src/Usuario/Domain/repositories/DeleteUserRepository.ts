import { User } from '../../Domain/models/User'

export interface DeleteUserRepository {
    deleteUser(uuid: string): Promise<void>;
  }
