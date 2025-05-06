import express from "express";
import {userRouter} from "./userRoutesUpd.js";
import {loggerRouter} from "./loggerRoutes.js";
import {postRouter} from "./postRoutes.js";

export const apiRouter = express.Router();
apiRouter.use('/users', userRouter);
apiRouter.use('/logger', loggerRouter);
apiRouter.use('/posts', postRouter);