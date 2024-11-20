import { CreatePetUseCase } from '../../Application/casos_de_uso/CreatePetUseCase';
import { UpdatePetUseCase } from '../../Application/casos_de_uso/UpdatePetUseCase';
import { DeletePetUseCase } from '../../Application/casos_de_uso/DeletePetUseCase';
import { GetPetByIdUseCase } from '../../Application/casos_de_uso/GetPetByIdUseCase';
import { GetAllPetsUseCase } from '../../Application/casos_de_uso/GetAllPetsUseCase';
import { Pet } from '../../Domain/entities/Pet';

export class PetController {
    constructor(
        private createPetUseCase: CreatePetUseCase,
        private updatePetUseCase: UpdatePetUseCase,
        private deletePetUseCase: DeletePetUseCase,
        private getPetByIdUseCase: GetPetByIdUseCase,
        private getAllPetsUseCase: GetAllPetsUseCase
    ) {}

    async create(data: Pet): Promise<void> {
        await this.createPetUseCase.execute(data);
    }

    async update(id: string, data: Partial<Pet>): Promise<void> {
        await this.updatePetUseCase.execute(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.deletePetUseCase.execute(id);
    }

    async getById(id: string): Promise<Pet | null> {
        return await this.getPetByIdUseCase.execute(id);
    }

    async getAll(): Promise<Pet[]> {
        return await this.getAllPetsUseCase.execute();
    }
}
