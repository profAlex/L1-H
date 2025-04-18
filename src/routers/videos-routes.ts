import {Router} from "express";
import {Request, Response} from "express";
import {videoDb} from "../db/mock-data";


export const videosRouter = Router();


videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json(videoDb.videos);
});


videosRouter.get('/:id', (req: Request, res: Response) => {
    const video = videoDb.videos.find((d) => d.id === +req.params.id);

    if(!video) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(video);
});


videosRouter.post('/', (req: Request, res: Response) => {
    // здесь валидация входящего реквеста
    /* const errors: ValidationError[] = driverInputDtoValidation(req.body);
    if(errors.length > 0) {
        res.status(HttpStatus.BadRequest).send({ errors: errors });
        return;
    }
*/
    const newVideo = {
        id: videoDb.videos.length ? videoDb.videos[videoDb.videos.length-1].id +  1 : 1,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(new Date().getDate() + 1),
        ...req.body
    };

    videoDb.videos.push(newVideo);

    res.status(201).send(newVideo);
});

videosRouter.put('/:id', (req: Request, res: Response) => {
    const video = videoDb.videos.find((d) => d.id === +req.params.id);

    if(!video) {
        res.sendStatus(404);
        return;
    }

    //проверяем на ошибки inputModel
    /*
    const errors = vehicleInputDtoValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
    }
    */

    const indexOfElement = videoDb.videos.findIndex((d) => d.id === +req.params.id);


    videoDb.videos[indexOfElement] = {
        ...videoDb.videos[indexOfElement],
        ...req.body
    };

    res.sendStatus(204); //.send(videoDb.videos[indexOfElement]);
});

videosRouter.delete('/:id', (req: Request, res: Response) => {
    const video = videoDb.videos.find((d) => d.id === +req.params.id);

    if(!video) {
        res.sendStatus(404);
        return;
    }

    const indexOfElement = videoDb.videos.findIndex((d) => d.id === +req.params.id);
    videoDb.videos.splice(indexOfElement, 1);
    res.sendStatus(204);
});
