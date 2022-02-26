import { Position } from "@prisma/client";
import { AsyncReturnType } from "./../../../@types/index.d";
import {
    deletePositionService,
    getPaginationPositionsService,
    getPositionDetailsService,
    updatePositionDetailsService,
} from "./position.service";

export type getPaginationPositionsDTO = AsyncReturnType<
    typeof getPaginationPositionsService
>;

export type getPositionDetailsDTO = AsyncReturnType<
    typeof getPositionDetailsService
>;

export type updatePositionDetailsBody = Pick<Position, "name" | "description">;

export type updatePositionDetailsDTO = AsyncReturnType<
    typeof updatePositionDetailsService
>;

export type deletePositionDTO = AsyncReturnType<typeof deletePositionService>;
