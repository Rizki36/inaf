import { errorResponse } from "./../helpers/methods";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

async function errorHandlerPrisma(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
    console.log(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        let errMsg = err.message;

        // @ts-ignore
        if (!!err?.meta?.cause) errMsg = err?.meta?.cause;

        // TODO : create validation middleware for check existing resource
        if (err.code === "P2002") errMsg = "Resource already exist !";
        if (err.code === "P2003")
            errMsg = "Resource already used in other resources !";

        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json(errorResponse({ message: errMsg }));
    }

    next(err);
}

export default errorHandlerPrisma;
