import { getCustomRepository } from "typeorm"
import { TagRepository } from "../repositories/TagRepository"
import { instanceToPlain } from "class-transformer";

class ListTagsService {
    async execute() {
        const tagRepository = getCustomRepository(TagRepository);

        const tags = tagRepository.find();

        return instanceToPlain(tags);
    }
}

export { ListTagsService }
