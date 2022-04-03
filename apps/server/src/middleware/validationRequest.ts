import { NextFunction, Request, Response } from "express";
import { ValidateOptions } from "yup/lib/types";
import { SchemaOf } from "yup";

/** validate request */
const validateRequest =
    (schema: SchemaOf<any>, options?: ValidateOptions) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req, {
                abortEarly: false,
                stripUnknown: true,
                ...options,
            });
            return next();
        } catch (error) {
            next(error);
        }
    };

export default validateRequest;
