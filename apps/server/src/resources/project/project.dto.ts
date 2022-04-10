import { Project } from "@prisma/client";
import { Request } from "express";
import { AsyncReturnType, PaginationProps } from "../../../@types";
import {
    createProjectService,
    deleteProjectService,
    paginationProjectService,
    projectDetailsService,
    updateProjectService,
} from "./project.service";

export type getPaginationProjectsDTO = AsyncReturnType<
    typeof paginationProjectService
>;

export type getProjectDetailsDTO = AsyncReturnType<
    typeof projectDetailsService
>;

export type createProjectBody = Pick<Project, "name" | "description">;

export type createProjectDTO = AsyncReturnType<typeof createProjectService>;

export type updateProjectDetailsBody = Pick<Project, "name" | "description">;

export type updateProjectDetailsDTO = AsyncReturnType<
    typeof updateProjectService
>;

export type deleteProjectDTO = AsyncReturnType<typeof deleteProjectService>;

/**
 * controller
 */

export type IPaginationProjectRequest = Request<
    {},
    {},
    {},
    {
        page?: string;
        perPage?: string;
        field: keyof Project;
        sort: "asc" | "desc";
        search?: string;
    }
>;

export type IUpdateProjectRequest = Request<
    { id: string },
    {},
    updateProjectDetailsBody,
    {}
>;

export type ICreateProjectRequest = Request<{}, {}, createProjectBody>;

/**
 * service
 */

export interface IPaginationProjectProps extends PaginationProps<Project> {}

export interface IProjectDetailsProps {
    id: string;
}

export interface ICreateProjectProps {
    body: createProjectBody;
}

export interface IUpdateProjectProps {
    id: string;
    body: updateProjectDetailsBody;
}

export interface IDeleteProjectProps {
    id: string;
}
