import { UpdateUserRepository } from '../../Domain/repositories/UpdateUserRepository';

interface UpdateUserDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class UpdateUser {
  constructor(private userRepository: UpdateUserRepository) {}

  async execute(uuid: string, updateData: UpdateUserDTO) {
    return await this.userRepository.updateUser(uuid, updateData);
  }
}
