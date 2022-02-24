import { getOrderPage } from "./../../helpers/pagination";
import { Position, PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    deletePositionService,
    getPaginationPositionsService,
    getPositionDetailsService,
    updatePositionDetailsService,
} from "./position.service";
import { updatePositionDetailsBody } from "./position.dto";

const prisma = new PrismaClient();

// get pagination position
export const getPaginationPositions = async (
    req: Request<
        {},
        {},
        {},
        {
            page?: string;
            perPage?: string;
            field: keyof Position;
            sort: "asc" | "desc";
            search?: string;
        }
    >,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40", field, sort, search } = req.query;

    try {
        const data = await getPaginationPositionsService({
            perPage: getPerPage(perPage),
            page: getPage(page),
            sortPage: getOrderPage<Position>({
                sortProps: { field, sort },
                filds: ["createdAt", "name"],
                defaultField: "name",
                defaultSort: "asc",
            }),
            search,
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

// get position details
export const getPositionDetails = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await getPositionDetailsService({
            id,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get position details
export const updatePositionDetails = async (
    req: Request<{ id: string }, {}, { body: updatePositionDetailsBody }, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("body", body);

        const data = await updatePositionDetailsService({
            id,
            body,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// create new user
export const createPosition = async (
    req: Request,
    res: Response
): Promise<any> => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        },
    });
    res.send(user);
};

// update existing user
export const updatePosition = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { name, email } = req.body as User;
    const user = await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            name,
            email,
        },
    });

    res.send(user);
};

// delete user
export const deletePosition = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await deletePositionService({
            id,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
