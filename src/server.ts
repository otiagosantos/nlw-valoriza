import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { CustomError } from "./customErrors/CustomError";
import cors from "cors";

import { router } from "../routes";
import "./database";

const app = express();

app.use(cors());

app.use(express.json());
app.use(router);

//error middleware
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof CustomError) {
        return response.status(error.code).json({
            error: error.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: error.message,
        details: error.stack
    })
})

app.listen(3000, () => console.log("Server is runing."));
