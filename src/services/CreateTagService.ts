import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";
import { CustomError } from "../customErrors/CustomError";

interface ITagRequest {
    name: string
}

class CreateTagService {
    async execute({name}: ITagRequest) {
        if(!name || name === "") {
            throw new CustomError({code: 401, message: "Invalid tag"});
        }

        const tagRepository = getCustomRepository(TagRepository);

        const tagAlredyExists = await tagRepository.findOne({name});

        if(tagAlredyExists) {
            throw new CustomError({code: 400, message: "Tag alredy exists"});
        }

        const tag = await tagRepository.create({name});

        await tagRepository.save(tag);

        return tag;

    }
}

export { CreateTagService };
