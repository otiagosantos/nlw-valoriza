import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";
import { CustomError } from "../customErrors/CustomError";

interface IUserRequest {
    name: string,
    email: string,
    password: string
    admin?: boolean,
}

class CreateUserService {

    async execute({ name, email, password, admin = false}: IUserRequest) {
        const userRepository = getCustomRepository(UserRepository);

        if (!email) {
            throw new CustomError({code: 400, message: "Invalid Email"});
        }

        const userAlredyExists = await userRepository.findOne({ email });

        if (userAlredyExists) {
            throw new CustomError({code: 400, message: "User alredy exists"});
        }
        
        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({ name, email, password: hashedPassword, admin });

        await userRepository.save(user);

        return user;
    }

}

export { CreateUserService };