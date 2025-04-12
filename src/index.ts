import express from "express";
import {setupApp} from "./setup-app";

const app = express();
setupApp(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})