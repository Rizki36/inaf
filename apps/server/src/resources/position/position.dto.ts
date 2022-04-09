import { Position } from "@prisma/client";
import { Request } from "express";
import { AsyncReturnType, PaginationProps } from "./../../../@types/index.d";
import {
    createPositionService,
    deletePositionService,
    paginationPositionService,
    positionDetailsService,
    updatePositionService,
} from "./position.service";

export type getPaginationPositionsDTO = AsyncReturnType<
    typeof paginationPositionService
>;

export type getPositionDetailsDTO = AsyncReturnType<
    typeof positionDetailsService
>;

export type createPositionBody = Pick<Position, "name" | "description">;

export type createPositionDTO = AsyncReturnType<typeof createPositionService>;

export type updatePositionBody = Pick<Position, "name" | "description">;

export type updatePositionDetailsDTO = AsyncReturnType<
    typeof updatePositionService
>;

export type deletePositionDTO = AsyncReturnType<typeof deletePositionService>;

/**
 * controller
 */

export type IPaginationPositionRequest = Request<
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
>;

export type IPositionDetailsRequest = Request<{ id: string }, {}, {}, {}>;

export type IUpdatePositionRequest = Request<
    { id: string },
    {},
    updatePositionBody,
    {}
>;

export type ICreatePositionRequest = Request<{}, {}, createPositionBody>;

/**
 * service
 */

export interface IPaginationPositionsProps extends PaginationProps<Position> {}

export interface IPositionDetailsProps {
    id: string;
}

export interface ICreatePositionProps {
    body: createPositionBody;
}

export interface IUpdatePositionProps {
    id: string;
    body: updatePositionBody;
}

export interface IDeletePositionProps {
    id: string;
}
