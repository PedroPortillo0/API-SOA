import { IPetRepository } from '../../Domain/Repositories/IPetRepository';
import { Pet } from '../../Domain/entities/Pet';

export class CreatePetUseCase {
    constructor(private repository: IPetRepository) {}

    async execute(pet: Pet): Promise<void> {
        await this.repository.create(pet);
    }
}
