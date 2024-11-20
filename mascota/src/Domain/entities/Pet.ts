import { v4 as uuidv4 } from "uuid";

export class Pet {
    constructor(
        public id: string = uuidv4(), // Generación de UUID por defecto
        public name: string,
        public species: string,
        public breed: string,
        public age: number,
        public weight: number,
        public height: number,
        public gender: string,
        public vaccines: string, // Cambiado a string
        public allergies: string,
        public sterilized: boolean,
        public userId: string // Relación con el usuario propietario
    ) {}
}
