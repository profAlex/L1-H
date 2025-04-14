"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const mock_data_1 = require("../db/mock-data");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', (req, res) => {
    res.status(200).json(mock_data_1.videoDb.videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(video);
});
exports.videosRouter.post('/', (req, res) => {
    // здесь валидация входящего реквеста
    /* const errors: ValidationError[] = driverInputDtoValidation(req.body);
    if(errors.length > 0) {
        res.status(HttpStatus.BadRequest).send({ errors: errors });
        return;
    }
*/
    const newVideo = Object.assign({ id: mock_data_1.videoDb.videos.length ? mock_data_1.videoDb.videos[mock_data_1.videoDb.videos.length - 1].id + 1 : 1, canBeDownloaded: false, minAgeRestriction: null, createdAt: new Date(), publicationDate: new Date(new Date().getDate() + 1) }, req.body);
    mock_data_1.videoDb.videos.push(newVideo);
    res.status(201).send(newVideo);
});
