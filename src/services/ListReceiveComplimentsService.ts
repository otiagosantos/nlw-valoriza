import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository"

class ListReceiveComplimentsService {
    async execute (user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository);

        const compliments = await complimentRepository.find({
            select: ["id", "message", "created_at"],
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }
}

export { ListReceiveComplimentsService }