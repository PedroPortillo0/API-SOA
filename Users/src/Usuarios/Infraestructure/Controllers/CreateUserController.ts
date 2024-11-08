import { Request, Response } from "express";
import { RegisterUser } from "../../Application/UseCases/RegisterUser";

export class CreateUserController {
    constructor(private registerUser: RegisterUser) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const newUser = await this.registerUser.execute(email, password);
            res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
