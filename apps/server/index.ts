export * from "./src/resources/user/user.dto";
export * from "./src/resources/position/position.dto";
export * from "./src/resources/project/project.dto";
export * from "./src/resources/team/team.dto";

import {
    User as IUser,
    Position as IPosition,
    Project as IProject,
    Team as ITeam,
} from "@prisma/client";
import { IResponse as Response } from "./@types/index.d";
export type IResponse<T> = Response<T>;

export type User = IUser;
export type Position = IPosition;
export type Project = IProject;
export type Team = ITeam;

// TODO : move into types folder
export type IResponsePagination<T> = {
    totalRows: number;
    page: number;
    perPage: number;
    data: T[];
};
