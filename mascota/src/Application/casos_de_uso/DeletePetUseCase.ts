import { IPetRepository } from '../../Domain/Repositories/IPetRepository';

export class DeletePetUseCase {
    constructor(private repository: IPetRepository) {}

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
