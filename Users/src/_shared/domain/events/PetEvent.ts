import { v4 as uuidv4 } from "uuid";

export class PetEvent {
  constructor(
    public id: string = uuidv4(), // Generación de UUID por defecto
    public name: string, // Nombre de la mascota
    public species: string, // Especie (e.g., perro, gato)
    public breed: string, // Raza
    public birth_date: string, // Fecha de nacimiento (formato: "YYYY-MM-DD")
    public weight: number, // Peso en kg
    public height: number, // Altura en cm
    public gender: string, // Género (e.g., macho, hembra)
    public allergies: string, // Alergias
    public sterilized: boolean, // Indica si está esterilizado/a
    public userId: string, // Relación con el usuario propietario
    public imageUrl: string // Nueva propiedad para la URL de la imagen
) {}
}

