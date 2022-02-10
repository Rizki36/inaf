import { errorResponse, errorValidationResponse } from './../helpers/methods';
import { NextFunction, Request, Response } from 'express'
import { MyError } from '../lib/Errors';

async function errorHandlerMyError(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
	if (err instanceof MyError) {
		return res
			.status(err.code)
			.json(errorResponse({ message: err.message }))
	}

	next(err)
}

export default errorHandlerMyError