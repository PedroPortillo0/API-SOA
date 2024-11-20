import { IPetRepository } from '../../Domain/Repositories/IPetRepository';

export class UpdatePetUseCase {
    constructor(private repository: IPetRepository) {}

    async execute(id: string, data: Partial<Record<string, unknown>>): Promise<void> {
        await this.repository.update(id, data);
    }
}
