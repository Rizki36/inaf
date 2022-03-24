import { Project } from "@prisma/client";
import { AsyncReturnType } from "../../../@types";
import {
    createProjectService,
    deleteProjectService,
    getPaginationProjectsService,
    getProjectDetailsService,
    updateProjectDetailsService,
} from "./project.service";

export type getPaginationProjectsDTO = AsyncReturnType<
    typeof getPaginationProjectsService
>;

export type getProjectDetailsDTO = AsyncReturnType<
    typeof getProjectDetailsService
>;

export type createProjectBody = Pick<Project, "name" | "description">;

export type createProjectDTO = AsyncReturnType<typeof createProjectService>;

export type updateProjectDetailsBody = Pick<Project, "name" | "description">;

export type updateProjectDetailsDTO = AsyncReturnType<
    typeof updateProjectDetailsService
>;

export type deleteProjectDTO = AsyncReturnType<typeof deleteProjectService>;
