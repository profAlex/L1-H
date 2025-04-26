import express, { Request, Response, Express } from "express";
import { videosRouter } from "./routers/videos-routes";
import { testingRouter } from "./routers/testing-routes";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use("/videos", videosRouter);
  app.use("/testing", testingRouter);

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello it_incubator!");
  });

  return app;
};
