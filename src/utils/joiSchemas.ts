import Joi, {ObjectSchema} from "joi";
import {Post} from "../model/postTypes.js";


export const postBodySchema: ObjectSchema<Post> = Joi.object({
    id: Joi.number().positive().min(1).max(1000).required(),
    userId: Joi.number().positive().min(1).max(100).required(),
    title: Joi.string(),
    text: Joi.string(),
})
export const userIdParamSchema = Joi.object({
    userId: Joi.string().pattern(/^\d+$/).required()
});

export const postIdParamSchema = Joi.object({
    id: Joi.string().pattern(/^\d+$/).required()
});
