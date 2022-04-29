import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserSevice";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const authenticateUserService = new AuthenticateUserService();
        
        const { email, password } = request.body;
        
        const token = await authenticateUserService.execute({email, password});

        return response.json(token);
    }
}

export { AuthenticateUserController };
