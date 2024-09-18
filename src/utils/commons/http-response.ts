import { Request, Response } from 'express';
import { THttpResponse } from '../../types';
import { ServerConfig } from '../../config';
import { EApplicationEnvironment } from '../constants';
import { Logger } from '.';

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: responseMessage,
        data: data,
    };

    // log the response
    Logger.log(`CONTROLLER_SUCCESS_RESPONSE`, { meta: response });

    // production ENV check
    if (ServerConfig.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    res.status(responseStatusCode).json({ response });
};
