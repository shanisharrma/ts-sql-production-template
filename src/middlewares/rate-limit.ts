import { NextFunction, Request, Response } from 'express';
import { rateLimiterMySQL, ServerConfig } from '../config';
import { EApplicationEnvironment, ResponseMessage } from '../utils/constants';
import { HttpError } from '../utils/commons';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, _: Response, next: NextFunction) => {
    if (ServerConfig.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return next(); // Skip rate limiting in development environment
    }

    if (rateLimiterMySQL) {
        rateLimiterMySQL
            .consume(req.ip as string, 1)
            .then(() => {
                next();
            })
            .catch(() => {
                // Too many requests, return 429
                HttpError(next, new Error(ResponseMessage.TOO_MANY_REQUESTS), req, StatusCodes.TOO_MANY_REQUESTS);
            });
    }
};
