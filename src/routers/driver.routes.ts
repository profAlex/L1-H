import {Router} from "express";
import {Request, Response} from "express";
import {driversDb} from "../db/mock-data";
import {Driver, DriverStatus} from "../drivers/driver-types";
import {driverInputDtoValidation} from "../drivers/driver-body-validation";
import {ValidationError} from "../core/validation-error";
import {HttpStatus} from "../core/http-statuses";

export const driverRouter = Router();



driverRouter.get("/", (req, res) => {
    res.status(200).json(driversDb.drivers);
});

driverRouter.get('/:id', (req: Request, res: Response) => {
    const driver = driversDb.drivers.find((d) => d.id === +req.params.id);
    if(!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }

    res.status(200).send(driver);
});


driverRouter.post('/', (req: Request, res: Response) => {
    const errors: ValidationError[] = driverInputDtoValidation(req.body);
    if(errors.length > 0) {
        res.status(HttpStatus.BadRequest).send({ errors: errors });
        return;
    }

    const newDriver: Driver = {
        id: driversDb.drivers.length ? driversDb.drivers[driversDb.drivers.length - 1].id + 1 : 1,
        status: DriverStatus.Online,
        createdAt: new Date(),
        ...req.body
    };

    driversDb.drivers.push(newDriver);

    res.status(201).send(newDriver);
});

