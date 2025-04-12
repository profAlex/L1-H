import express, {Express} from "express";


export const setupApp =(app: Express) => {
    app.use(express.json());

    return app;
}