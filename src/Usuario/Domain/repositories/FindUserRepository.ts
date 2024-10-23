import { User } from '../../Domain/models/User'

export interface FindUserRepository {
    findAllUsers(page: number, limit: number): Promise<User[]>;
    countUsers(): Promise<number>;
    findUserByUuid(uuid: string): Promise<User | null>;
  }