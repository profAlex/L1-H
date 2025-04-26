"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videos_routes_1 = require("./routers/videos-routes");
const testing_routes_1 = require("./routers/testing-routes");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use("/videos", videos_routes_1.videosRouter);
    app.use("/testing", testing_routes_1.testingRouter);
    app.get("/", (req, res) => {
        res.status(200).send("Hello it_incubator!");
    });
    return app;
};
exports.setupApp = setupApp;
