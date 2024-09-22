import { NextFunction, Request } from 'express';
import { ErrorObject } from '../errors';

export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatusCode: number = 500) => {
    const errorObj = ErrorObject(err, req, errorStatusCode);
    nextFunc(errorObj);
};
