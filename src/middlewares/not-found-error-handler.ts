import { NextFunction, Request, Response } from 'express';
import { ResponseMessage } from '../utils/constants';
import { HttpError } from '../utils/commons';

export default (req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(ResponseMessage.NOT_FOUND('Route'));
    } catch (error) {
        HttpError(next, error, req, 404);
    }
};
