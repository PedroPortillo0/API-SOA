import { v4 as uuidv4 } from 'uuid';
import { ContactVeterinario } from "../../../ContacVeterinario/Domain/Entities/ContacVeterinario";  

export class Veterinario {
  private id: string;
  private image_url: string;
  private password: string;
  private cedulaVerified: "NoVerificado" | "Verificado";
  private contact: ContactVeterinario;
  private verified: Date | null;

  constructor(
    image_url: string,
    password: string,
    cedulaVerified: "NoVerificado",
    contact: ContactVeterinario,
    id?: string,
    verified: Date | null = null
  ) {
    this.id = id || uuidv4();
    this.image_url = image_url;
    this.password = password;
    this.cedulaVerified = cedulaVerified;
    this.contact = contact;
    this.verified = verified;
  }

  getId(): string {
    return this.id;
  }

  getImage(): string {
    return this.image_url;
  }

  getPassword(): string {
    return this.password;
  }

  getContact(): ContactVeterinario {
    return this.contact;
  }

  getEmail(): string {
    return this.contact.getEmail();
  }

  getPhone(): string {
    return this.contact.getPhone();
  }

  promoteToUser(): void {
    this.contact.promoteToUser();
  }

  isContactPromotedToUser(): boolean {
    return this.contact.getStatus() === "USER";
  }

  verifyUser(): void {
    this.verified = new Date();
  }

  isVerified(): boolean {
    return this.verified !== null;
  }

  getVerificationDate(): Date | null {
    return this.verified;
  }

  updatePassword(newHashedPassword: string): void {
    this.password = newHashedPassword;
  }

  getCedula(): string {
    return this.cedulaVerified;
  }

  verificarCedula(): boolean {
    this.cedulaVerified = "Verificado";
    return true;
  }
}
