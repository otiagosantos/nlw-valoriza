import { Request, Response } from "express";
import { ListSendComplimentsService } from "../services/ListSendComplimentsService";

class ListSendComplimentsController {
    async handle(request: Request, response: Response) {
        const listSendComplimentsService = new ListSendComplimentsService();
        
        const { user_id } = request;

        const compliemnts = await listSendComplimentsService.execute(user_id);

        return response.status(200).json(compliemnts);
    }
}

export { ListSendComplimentsController }