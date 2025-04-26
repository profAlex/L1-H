import { Request, Response, Router } from "express";
import { videoDb } from "../db/mock-data";
import { HttpStatus } from "../utility/utility-functions";

export const testingRouter = Router();

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  videoDb.videos = [];
  res.sendStatus(HttpStatus.NoContent);
});
