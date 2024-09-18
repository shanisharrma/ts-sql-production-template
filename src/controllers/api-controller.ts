import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpResponse } from '../utils/commons';
import { ResponseMessage } from '../utils/constants';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            HttpResponse(req, res, 200, ResponseMessage.SUCCESS);
        } catch (error) {
            HttpError(next, error, req, 500);
        }
    },
};
