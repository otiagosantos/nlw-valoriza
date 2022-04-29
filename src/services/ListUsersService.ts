import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import { instanceToPlain } from "class-transformer";

class ListUsersService {
    async execute() {
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.find();

        return instanceToPlain(users);
    }
}

export { ListUsersService }