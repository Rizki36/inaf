import { NextFunction, Request, Response } from "express";
import { ValidateOptions } from "yup/lib/types";
import { SchemaOf } from 'yup'

const validate = (schema: SchemaOf<any>, options?: ValidateOptions) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
			...options
		});
		return next();
	} catch (error) {
		next(error)
	}
};

export default validate