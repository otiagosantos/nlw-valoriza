import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";
import jwt from "jsonwebtoken";

class CreateComplimentController{
    async handle(request: Request, response: Response) {
        const {tag_id, user_receiver, message } = request.body;

        const { user_id } = request;
        
        const createComplimentSerivce = new CreateComplimentService();

        const compliment = await createComplimentSerivce.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        });

        return response.json(compliment);
    }
}

export { CreateComplimentController}