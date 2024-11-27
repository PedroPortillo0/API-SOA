
export class Veterinario {
    private id: string;
    private nombre: string;
    private apellido: string;
    private correo: string;
    private ubicacion: string; // LatitudLongitud como string
    private telefono: string;
    private contrasenia: string; // Contraseña hasheada
    private imagenUrl: string; // URL de la cédula profesional
    private creadoEn: Date; // Fecha de registro
    private verified: Date | null; // Fecha de verificación o null
    private verifiedCedula: string; // Estado de la cédula ("no registrado", "verificado")
  
    constructor(
      id: string,
      nombre: string,
      apellido: string,
      correo: string,
      ubicacion: string,
      telefono: string,
      contrasenia: string,
      imagenUrl: string,
      creadoEn: Date = new Date(),
      verified: Date | null = null,
      verifiedCedula: string = "no registrado" // Valor predeterminado
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.ubicacion = ubicacion;
      this.telefono = telefono;
      this.contrasenia = contrasenia;
      this.imagenUrl = imagenUrl;
      this.creadoEn = creadoEn;
      this.verified = verified;
      this.verifiedCedula = verifiedCedula;
    }
  
    // Métodos para obtener y actualizar el estado de la cédula
    public getVerifiedCedula(): string {
      return this.verifiedCedula;
    }
  
    public setVerifiedCedula(status: string): void {
      if (["no registrado", "verificado"].includes(status)) {
        this.verifiedCedula = status;
      } else {
        throw new Error("Estado de cédula no válido");
      }
    }
  }
  