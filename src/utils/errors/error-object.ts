import { Request } from 'express';
import { THttpError } from '../../types';
import { EApplicationEnvironment, EApplicationEvents, ResponseMessage } from '../constants';
import { ServerConfig } from '../../config';
import { Logger } from '../commons';

export default (err: Error | unknown, req: Request, errorStatusCode: number = 500) => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message || ResponseMessage.SOMETHING_WENT_WRONG : ResponseMessage.SOMETHING_WENT_WRONG,
        data: err,
        trace: err instanceof Error ? { error: err.stack } : null,
    };

    // log the response
    Logger.error(EApplicationEvents.CONTROLLER_ERROR_RESPONSE, { meta: errorObj });

    // production ENV check
    if (ServerConfig.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip;
        delete errorObj.trace;
    }

    return errorObj;
};
