import { Role } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { unauthenticatedResponse, unauthorizedResponse } from "../helpers/methods"

export const authorization = (roles: Role[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const userLogin = req.user
		if (!userLogin) return res.status(401).send(unauthenticatedResponse())

		if (userLogin && !roles.includes(userLogin?.role)) {
			return res.status(403).send(unauthorizedResponse())
		}

		next()
	}
}