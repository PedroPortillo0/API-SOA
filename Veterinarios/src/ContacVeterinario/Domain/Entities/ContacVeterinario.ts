import { v4 as uuidv4 } from 'uuid';

export class ContactVeterinario {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phone: string;
  private ubication: string;
  private status: "LEAD" | "USER";
  
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    ubication: string,
    status: "LEAD" = "LEAD",
    id?: string
  ) {
    this.id = id || uuidv4(); 
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.ubication= ubication,
    this.status = status;
  }

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getUbication(): string{
    return this.ubication
  }


  promoteToUser(): void {
    this.status = "USER";
  }

  getStatus(): string {
    return this.status;
  }
}
