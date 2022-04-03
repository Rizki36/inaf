import { errorValidationResponse } from "./../helpers/methods";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";

async function errorHandlerYup(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
    if (err instanceof ValidationError) {
        const error =
            err.inner.length > 0
                ? err.inner.reduce((acc: any, curVal: any) => {
                      acc[`${curVal.path}`] = curVal.message || curVal.type;
                      return acc;
                  }, {})
                : { [`${err.path}`]: err.message || err.type };

        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json(errorValidationResponse(error));
    }

    next(err);
}

export default errorHandlerYup;
