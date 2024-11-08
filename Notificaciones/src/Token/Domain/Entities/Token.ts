export class Token {
  constructor(
      public token: string,
      public userId: string,
      public createdAt: Date = new Date(),
      public usedAt?: Date
  ) {}
}
