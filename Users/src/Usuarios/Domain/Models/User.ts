export class User {
    constructor(
        public uuid: string,
        public email: string,
        public password: string,
        public createdAt: Date = new Date(),
        public isVerified: boolean = false
    ) {}
}
