import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    sub: string;
}

const ensureAuthenticated = (request: Request, response: Response, next: NextFunction) => {

    const bearerToken = request.headers['authorization'];

    if(!bearerToken) {
        return response.status(401).end();
    }

    const token = bearerToken.split(" ")[1];

    try {

        const { sub } = jwt.verify(token, process.env.API_SECRET_KEY) as IPayload;
        
        request.user_id = sub;

        next();
    } catch (error) {
        return response.status(401).end();
    }
}

export { ensureAuthenticated }
