import { v4 as uuidv4 } from "uuid";


export class ContactVeterinario {
    private id: string;
    private nombre: string;
    private apellido: string;
    private correo: string;
    private telefono: string;
    private ubicacion: string;
    private status: "LEAD" | "USER";

  
    constructor(
      nombre: string,
      apellido: string,
      correo: string,
      telefono: string,
      ubicacion: string,
      status: "LEAD" = "LEAD",
      id?: string
    ) {
      this.id = id || uuidv4(); // Generar un UUID si no se proporciona
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.telefono = telefono;
      this.ubicacion = ubicacion;
      this.status = status;
    }
  
    // Métodos getter
    getId(): string {
      return this.id;
    }
  
    getFirstName(): string {
      return this.nombre;
    }
  
    getLastName(): string {
      return this.apellido;
    }
  
    getEmail(): string {
      return this.correo;
    }
  
    getPhone(): string {
      return this.telefono;
    }
  
    getUbicacion(): string {
      return this.ubicacion;
    }

    getStatus(): string {
        return this.status;
    }

    promoteToUser(): void {
        this.status = "USER";
    }
      
  
    // Métodos setter (si necesitas actualizar algún campo)
    setUbicacion(nuevaUbicacion: string): void {
      this.ubicacion = nuevaUbicacion;
    }
  }
  