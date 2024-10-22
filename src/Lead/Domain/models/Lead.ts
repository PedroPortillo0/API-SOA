export class Lead {
    constructor(
      public id: number,
      public uuid: string,
      public email: string,
      public firstName: string,
      public lastName: string,
      public phone: string,
      public createdAt: Date
    ) {}
  }
  