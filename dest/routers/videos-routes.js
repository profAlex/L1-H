"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const mock_data_1 = require("../db/mock-data");
const fields_validation_1 = require("../validation/fields-validation");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', (req, res) => {
    res.status(200).json(mock_data_1.videoDb.videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    //const errors: FieldError[] = newVideoFieldsValidation(req);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(video);
});
exports.videosRouter.post('/', (req, res) => {
    // здесь валидация входящего реквеста
    const errors = (0, fields_validation_1.newVideoFieldsValidation)(req);
    if (errors.length > 0) {
        res.status(400).send({ errors: errors });
        return;
    }
    const newVideo = Object.assign({ id: mock_data_1.videoDb.videos.length ? mock_data_1.videoDb.videos[mock_data_1.videoDb.videos.length - 1].id + 1 : 1, canBeDownloaded: false, minAgeRestriction: null, createdAt: new Date(), publicationDate: new Date(new Date().getDate() + 1) }, req.body);
    mock_data_1.videoDb.videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.put('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    if (!video) {
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
    const indexOfElement = mock_data_1.videoDb.videos.findIndex((d) => d.id === +req.params.id);
    mock_data_1.videoDb.videos[indexOfElement] = Object.assign(Object.assign({}, mock_data_1.videoDb.videos[indexOfElement]), req.body);
    res.sendStatus(204); //.send(videoDb.videos[indexOfElement]);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    const indexOfElement = mock_data_1.videoDb.videos.findIndex((d) => d.id === +req.params.id);
    mock_data_1.videoDb.videos.splice(indexOfElement, 1);
    res.sendStatus(204);
});
