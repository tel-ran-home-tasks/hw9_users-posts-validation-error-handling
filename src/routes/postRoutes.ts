import express, {Request, Response, NextFunction} from "express";
import * as controller from '../controllers/postController.js';
import {logger} from "../events/logger.js";
import {createValidator} from 'express-joi-validation';
import asyncHandler from 'express-async-handler';
import {postBodySchema, userIdParamSchema, postIdParamSchema} from "../utils/joiSchemas.js";

const validator = createValidator({});

export const postRouter = express.Router();

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    logger.log(`Request "api/posts${req.url}" was called`);
    next();
});

postRouter.get('/user/:userId',
    validator.params(userIdParamSchema),
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.userId);
        const result = await controller.getUserPost(userId);
        res.json(result);
    })
);

postRouter.delete('/post/:id',
    validator.params(postIdParamSchema),
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await controller.removePost(id);
        res.json(result);
    })
);

postRouter.put('/',
    validator.body(postBodySchema),
    asyncHandler(async (req, res) => {
        const post = req.body;
        await controller.updatePost(post);
        res.send("Post successfully updated");
    })
);

postRouter.post('/',
    validator.body(postBodySchema),
    asyncHandler(async (req, res) => {
        const post = req.body;
        await controller.addPost(post);
        res.send("Post successfully added");
    })
);

postRouter.get('/',
    asyncHandler(async (req, res) => {
        const result = await controller.getAllPosts();
        res.json(result);
    })
);

postRouter.get('/post/:id',
    validator.params(postIdParamSchema),
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await controller.getPostById(id);
        res.json(result);
    })
);