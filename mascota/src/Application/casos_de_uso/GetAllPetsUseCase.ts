import { IPetRepository } from '../../Domain/Repositories/IPetRepository';

export class GetAllPetsUseCase {
    constructor(private repository: IPetRepository) {}

    async execute() {
        return await this.repository.getAll();
    }
}
