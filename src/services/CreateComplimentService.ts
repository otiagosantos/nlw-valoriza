import { getCustomRepository } from "typeorm"
import { CustomError } from "../customErrors/CustomError";
import { ComplimentRepository } from "../repositories/ComplimentRepository"
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentService {
    async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest) {

        const complimentRepository = getCustomRepository(ComplimentRepository);
        const userRepository = getCustomRepository(UserRepository);

        if(user_sender === user_receiver) {
            throw new CustomError({code: 400, message: "Invalid User Receiver"});
        }

        const userReceiverExists = await userRepository.findOne({id: user_receiver});

        if(!userReceiverExists) {
            throw new CustomError({code: 400, message: "User Receiver does not exists"});
        }
        
        const compliment = await complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentRepository.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService }