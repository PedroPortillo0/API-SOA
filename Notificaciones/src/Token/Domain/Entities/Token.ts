export class Token {
  constructor(
      public readonly uuid: string,
      public userEmail: string,
      public token: string,
      public createdAt: Date,
      public expiresAt: Date,
      public used: boolean = false,
      public usedAt?: Date,
      public expired: boolean = false
  ) {}
}
