import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpError } from '../utils/commons';
import { StatusCodes } from 'http-status-codes';

export default {
    validateRequest: (schema: Joi.Schema) => {
        return (req: Request, _: Response, next: NextFunction) => {
            const { error, value } = schema.validate(req.body);

            if (error) {
                HttpError(next, error, req, StatusCodes.UNPROCESSABLE_ENTITY);
            }
            req.body = value;
            next();
        };
    },
};

