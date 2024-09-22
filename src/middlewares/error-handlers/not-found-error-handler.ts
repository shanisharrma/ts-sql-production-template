import { NextFunction, Request, Response } from 'express';
import { ResponseMessage } from '../../utils/constants';
import { HttpError } from '../../utils/commons';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(ResponseMessage.NOT_FOUND('Route'));
    } catch (error) {
        HttpError(next, error, req, StatusCodes.NOT_FOUND);
    }
};
