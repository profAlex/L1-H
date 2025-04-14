"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const mock_data_1 = require("../db/mock-data");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => {
    mock_data_1.driversDb.drivers = [];
    res.sendStatus(204);
});
