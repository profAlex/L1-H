"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = require("express");
const mock_data_1 = require("../db/mock-data");
const driver_types_1 = require("../drivers/driver-types");
const driver_body_validation_1 = require("../drivers/driver-body-validation");
const http_statuses_1 = require("../core/http-statuses");
exports.driverRouter = (0, express_1.Router)();
exports.driverRouter.get("/", (req, res) => {
    res.status(200).json(mock_data_1.driversDb.drivers);
});
exports.driverRouter.get('/:id', (req, res) => {
    const driver = mock_data_1.driversDb.drivers.find((d) => d.id === +req.params.id);
    if (!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }
    res.status(200).send(driver);
});
exports.driverRouter.post('/', (req, res) => {
    const errors = (0, driver_body_validation_1.driverInputDtoValidation)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send({ errors: errors });
        return;
    }
    const newDriver = Object.assign({ id: mock_data_1.driversDb.drivers.length ? mock_data_1.driversDb.drivers[mock_data_1.driversDb.drivers.length - 1].id + 1 : 1, status: driver_types_1.DriverStatus.Online, createdAt: new Date() }, req.body);
    mock_data_1.driversDb.drivers.push(newDriver);
    res.status(201).send(newDriver);
});
