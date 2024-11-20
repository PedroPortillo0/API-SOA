import { IPetRepository } from '../../Domain/Repositories/IPetRepository';

export class GetPetByIdUseCase {
    constructor(private repository: IPetRepository) {}

    async execute(id: string) {
        return await this.repository.getById(id);
    }
}
