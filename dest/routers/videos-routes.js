"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const mock_data_1 = require("../db/mock-data");
const fields_validation_1 = require("../validation/fields-validation");
const utility_functions_1 = require("../utility/utility-functions");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', (req, res) => {
    res.status(utility_functions_1.HttpStatus.Ok).json(mock_data_1.videoDb.videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        res.sendStatus(utility_functions_1.HttpStatus.NoContent);
        return;
    }
    res.status(utility_functions_1.HttpStatus.Ok).send(video);
});
exports.videosRouter.post('/', (req, res) => {
    //
    if (mock_data_1.videoDb.videos.find((d) => d.id === +req.body.id)) {
        const error = { field: 'id', message: 'id must be unique' };
        res.status(utility_functions_1.HttpStatus.BadRequest).send({ errorMessage: error });
        return;
    }
    // валидация входящего реквеста
    const errorsMessages = (0, fields_validation_1.newVideoFieldsValidation)(req);
    if (errorsMessages.length > 0) {
        res.status(utility_functions_1.HttpStatus.BadRequest).send({ errorsMessages: errorsMessages });
        return;
    }
    const newVideo = Object.assign({ id: mock_data_1.videoDb.videos.length ? mock_data_1.videoDb.videos[mock_data_1.videoDb.videos.length - 1].id + 1 : 1, canBeDownloaded: false, minAgeRestriction: null, createdAt: new Date(), publicationDate: (0, utility_functions_1.CreateDefaultDate)() }, req.body);
    mock_data_1.videoDb.videos.push(newVideo);
    res.status(utility_functions_1.HttpStatus.Ok).send(newVideo);
});
exports.videosRouter.put('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        res.sendStatus(utility_functions_1.HttpStatus.NoContent);
        return;
    }
    const errorsMessages = (0, fields_validation_1.updateVideoFieldsValidation)(req);
    if (errorsMessages.length > 0) {
        res.status(utility_functions_1.HttpStatus.BadRequest).send({ errorsMessages: errorsMessages });
        return;
    }
    const indexOfElement = mock_data_1.videoDb.videos.findIndex((d) => d.id === +req.params.id);
    mock_data_1.videoDb.videos[indexOfElement] = Object.assign(Object.assign({}, mock_data_1.videoDb.videos[indexOfElement]), req.body);
    res.sendStatus(utility_functions_1.HttpStatus.NoContent);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const video = mock_data_1.videoDb.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        res.sendStatus(utility_functions_1.HttpStatus.NotFound);
        return;
    }
    const indexOfElement = mock_data_1.videoDb.videos.findIndex((d) => d.id === +req.params.id);
    mock_data_1.videoDb.videos.splice(indexOfElement, 1);
    res.sendStatus(utility_functions_1.HttpStatus.NoContent);
});
