import { User } from '../../Domain/models/User'
import { Lead } from '../../../Lead/Domain/models/Lead';


export interface UserRepository {
  createUserFromLead(lead: Lead, hashedPassword: string): Promise<void>;
  createUser(user: User): Promise<void>;
  saveTokenByUuid(uuid: string, token: string): Promise<void>;
  findTokenByUuid(uuid: string): Promise<any>;
  verifyUserByUuid(uuid: string): Promise<void>;
}

