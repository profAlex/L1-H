import {Request, Response, Router} from "express";
import {videoDb} from "../db/mock-data";
import {Video} from "../basic_types/basic-types";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videoDb.videos = [];
    res.sendStatus(204);
});