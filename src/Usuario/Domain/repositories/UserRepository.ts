import { User } from '../../Domain/models/User'

export interface UserRepository {
  createUser(user: User): Promise<void>;
  saveTokenByUuid(uuid: string, token: string): Promise<void>;
  findTokenByUuid(uuid: string): Promise<any>;
  verifyUserByUuid(uuid: string): Promise<void>;
}
