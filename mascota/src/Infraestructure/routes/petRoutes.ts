// import { Router } from 'express';
// import { PetController } from '../controller/PetController';
// import { PetRepository } from '../percistence/PetRepository';
// import { CreatePetUseCase } from '../../Application/casos_de_uso/CreatePetUseCase';
// import { UpdatePetUseCase } from '../../Application/casos_de_uso/UpdatePetUseCase';
// import { DeletePetUseCase } from '../../Application/casos_de_uso/DeletePetUseCase';
// import { GetPetByIdUseCase } from '../../Application/casos_de_uso/GetPetByIdUseCase';
// import { GetAllPetsUseCase } from '../../Application/casos_de_uso/GetAllPetsUseCase';

// export default (db: any) => {
//     const router = Router();
//     const petRepository = new PetRepository(db);

//     const petController = new PetController(
//         new CreatePetUseCase(petRepository),
//         new UpdatePetUseCase(petRepository),
//         new DeletePetUseCase(petRepository),
//         new GetPetByIdUseCase(petRepository),
//         new GetAllPetsUseCase(petRepository)
//     );

//     router.post('crear/mascota/', async (req, res) => {
//         try {
//             await petController.create(req.body);
//             res.status(201).send('Pet created successfully');
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(500).send(error.message);
//             } else {
//                 res.status(500).send('An unexpected error occurred');
//             }
//         }
//     });

//     router.put('actualizar/mascota/:id', async (req, res) => {
//         try {
//             await petController.update(req.params.id, req.body);
//             res.status(200).send('Pet updated successfully');
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(500).send(error.message);
//             } else {
//                 res.status(500).send('An unexpected error occurred');
//             }
//         }
//     });

//     router.delete('eliminar/mascota/:id', async (req, res) => {
//         try {
//             await petController.delete(req.params.id);
//             res.status(200).send('Pet deleted successfully');
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(500).send(error.message);
//             } else {
//                 res.status(500).send('An unexpected error occurred');
//             }
//         }
//     });

//     router.get('mascota/:id', async (req, res) => {
//         try {
//             const pet = await petController.getById(req.params.id);
//             if (pet) res.status(200).json(pet);
//             else res.status(404).send('Pet not found');
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(500).send(error.message);
//             } else {
//                 res.status(500).send('An unexpected error occurred');
//             }
//         }
//     });

//     router.get('obtener/mascotas/', async (req, res) => {
//         try {
//             const pets = await petController.getAll();
//             res.status(200).json(pets);
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(500).send(error.message);
//             } else {
//                 res.status(500).send('An unexpected error occurred');
//             }
//         }
//     });

//     return router;
// };
