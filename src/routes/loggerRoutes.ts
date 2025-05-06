import express from "express";
import {LoggerController} from "../controllers/loggerController.js";

const loggerController = new LoggerController();
export const loggerRouter = express.Router();

loggerRouter.get('/', (req, res) => {
    loggerController.getLoggerArray(res);
})