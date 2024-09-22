import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpResponse } from '../utils/commons';
import { ResponseMessage } from '../utils/constants';
import { Quicker } from '../utils/helpers';
import { StatusCodes } from 'http-status-codes';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            HttpResponse(req, res, StatusCodes.OK, ResponseMessage.SUCCESS);
        } catch (error) {
            HttpError(next, error, req, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: Quicker.getApplicationHealth(),
                system: Quicker.getSystemHealth(),
                timestamp: Date.now(),
            };

            HttpResponse(req, res, StatusCodes.OK, ResponseMessage.SUCCESS, healthData);
        } catch (error) {
            HttpError(next, error, req, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
};
