"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const mock_data_1 = require("../db/mock-data");
const utility_functions_1 = require("../utility/utility-functions");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => {
    mock_data_1.videoDb.videos = [];
    res.sendStatus(utility_functions_1.HttpStatus.NoContent);
});
