import { Request, Response, NextFunction, response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

const ensureAdmin = async (request: Request, response: Response, next: NextFunction) => {
    
    const { user_id } = request;
    
    const userRepository = getCustomRepository(UserRepository);

    const { admin } = await userRepository.findOne(user_id);

    if(admin) {
        return next();
    }

    return response.status(401).json({
        Error: "Unauthorizated"
    });
}

export { ensureAdmin }