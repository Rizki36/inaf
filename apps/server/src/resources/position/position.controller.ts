import { Position } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage, getOrderPage } from "../../helpers/pagination";
import { createdResponse, successResponse } from "../../helpers/methods";

import {
    createPositionService,
    deletePositionService,
    paginationPositionService,
    positionDetailsService,
    updatePositionService,
} from "./position.service";
import {
    ICreatePositionRequest,
    IPaginationPositionRequest,
    IPositionDetailsRequest,
    IUpdatePositionRequest,
} from "./position.dto";

/** pagination position */
export const paginationPosition = async (
    req: IPaginationPositionRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let { page = "0", perPage = "40", field, sort, search } = req.query;

        const data = await paginationPositionService({
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

/** position details */
export const positionDetails = async (
    req: IPositionDetailsRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const data = await positionDetailsService({
            id,
        });

        return res.send(
            successResponse({
                data: data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** update position */
export const updatePosition = async (
    req: IUpdatePositionRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const data = await updatePositionService({
            id,
            body: {
                name,
                description,
            },
        });

        return res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/* create position */
export const createPosition = async (
    req: ICreatePositionRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { name, description } = req.body;

        const position = await createPositionService({
            body: {
                name,
                description,
            },
        });

        res.send(createdResponse(position));
    } catch (error) {
        next(error);
    }
};

/** delete user */
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

        return res.send(
            successResponse<typeof data>({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};
