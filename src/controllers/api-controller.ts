import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpResponse } from '../utils/commons';
import { ResponseMessage } from '../utils/constants';
import { Quicker } from '../utils/helpers';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            HttpResponse(req, res, 200, ResponseMessage.SUCCESS);
        } catch (error) {
            HttpError(next, error, req, 500);
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: Quicker.getApplicationHealth(),
                system: Quicker.getSystemHealth(),
                timestamp: Date.now(),
            };

            HttpResponse(req, res, 200, ResponseMessage.SUCCESS, healthData);
        } catch (error) {
            HttpError(next, error, req, 500);
        }
    },
};
