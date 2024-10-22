export class User {
    constructor(
      public id: number,
      public uuid: string,
      public email: string,
      public password: string,
      public isVerified: boolean,
      public createdAt: Date,
      public verifiedAt?: Date
    ) {}
  }
  