import { getCustomRepository } from "typeorm";
import { CustomError } from "../customErrors/CustomError";
import { UserRepository } from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateUserRequest) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({email});

        if(!user) {
            throw new CustomError({code: 400, message: "Email/Password is Incorrect"});
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new CustomError({code: 400, message: "Email/Password is Incorrect"});
        }

        const token = sign(
            {
                email: user.email
            },
            process.env.API_SECRET_KEY,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;

    }
}

export { AuthenticateUserService };
