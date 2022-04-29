import { Request, Response } from "express";
import { ListReceiveComplimentsService } from "../services/ListReceiveComplimentsService";


class ListReceiveComplimentsController {
    async handle(request: Request, response: Response) {
        const listReceiveComplimentsService = new ListReceiveComplimentsService();

        const { user_id } = request;

        const compliments = await listReceiveComplimentsService.execute(user_id);

        return response.status(200).json(compliments);

    }
}

export { ListReceiveComplimentsController }
