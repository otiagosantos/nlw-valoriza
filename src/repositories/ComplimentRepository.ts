import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository(Compliment)
class ComplimentRepository extends Repository<Compliment> {}

export { ComplimentRepository }