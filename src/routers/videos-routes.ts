import { Router } from "express";
import { Request, Response } from "express";
import { videoDb } from "../db/mock-data";
import { FieldError } from "../basic_types/basic-types";
import {
  newVideoFieldsValidation,
  updateVideoFieldsValidation,
} from "../validation/fields-validation";
import { CreateDefaultDate, HttpStatus } from "../utility/utility-functions";

export const videosRouter = Router();

videosRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send(videoDb.videos);
});

videosRouter.get("/:id", (req: Request, res: Response) => {
  const video = videoDb.videos.find((d) => d.id === +req.params.id);

  if (!video) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(video);
});

videosRouter.post("/", (req: Request, res: Response) => {
  //
  if (videoDb.videos.find((d) => d.id === +req.body.id)) {
    const error: FieldError = { field: "id", message: "id must be unique" };
    res.status(HttpStatus.BadRequest).send({ errorMessage: error });
    return;
  }

  // валидация входящего реквеста
  const errorsMessages: FieldError[] = newVideoFieldsValidation(req);

  if (errorsMessages.length > 0) {
    res.status(HttpStatus.BadRequest).send({ errorsMessages: errorsMessages });
    return;
  }

  const newVideo = {
    id: videoDb.videos.length
      ? videoDb.videos[videoDb.videos.length - 1].id + 1
      : 1,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date(),
    publicationDate: CreateDefaultDate(), //new Date(new Date().getTime() + 86400000),
    ...req.body,
  };

  videoDb.videos.push(newVideo);

  res.status(201).send(newVideo);
});

videosRouter.put("/:id", (req: Request, res: Response) => {
  const video = videoDb.videos.find((d) => d.id === +req.params.id);

  if (!video) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  const errorsMessages: FieldError[] = updateVideoFieldsValidation(req);

  if (errorsMessages.length > 0) {
    res.status(HttpStatus.BadRequest).send({ errorsMessages: errorsMessages });
    return;
  }

  const indexOfElement = videoDb.videos.findIndex(
    (d) => d.id === +req.params.id,
  );

  videoDb.videos[indexOfElement] = {
    ...videoDb.videos[indexOfElement],
    ...req.body,
  };

  res.sendStatus(204);
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const video = videoDb.videos.find((d) => d.id === +req.params.id);

  if (!video) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  const indexOfElement = videoDb.videos.findIndex(
    (d) => d.id === +req.params.id,
  );
  videoDb.videos.splice(indexOfElement, 1);
  res.sendStatus(HttpStatus.NoContent);
});
