import { Prisma, TaskGroup } from "@prisma/client";
import { Request } from "express";
import { AsyncReturnType, PaginationProps } from "../../../@types";
import {
    createTaskGroupService,
    deleteTaskGroupService,
    taskGroupPaginationService,
    taskGroupDetailsService,
    updateTaskGroupService,
} from "./task_group.service";

/** pagination task group */
export type getPaginationTaskGroupsDTO = AsyncReturnType<
    typeof taskGroupPaginationService
>;

/** details task group */
export type getTaskGroupDetailsDTO = AsyncReturnType<
    typeof taskGroupDetailsService
>;

/** create task group */
export interface createTaskGroupBody
    extends Pick<TaskGroup, "name" | "description" | "projectId"> {
    attachment: Prisma.InputJsonValue;
}
export type createTaskGroupDTO = AsyncReturnType<typeof createTaskGroupService>;

/** update task group */
export interface updateTaskGroupBody
    extends Pick<TaskGroup, "name" | "description" | "projectId"> {
    attachment: Prisma.InputJsonValue;
}
export type updateTaskGroupDTO = AsyncReturnType<typeof updateTaskGroupService>;

/** delete task group */
export type deleteTaskGroupDTO = AsyncReturnType<typeof deleteTaskGroupService>;

/**
 * service
 */

export interface IPaginationTaskGroupsProps
    extends PaginationProps<TaskGroup> {}

export interface ITaskGroupDetailsServiceProps {
    id: string;
}

export interface ICreateTaskGroupServiceProps {
    body: createTaskGroupBody;
}

export interface IUpdateTaskGroupProps {
    id: string;
    body: updateTaskGroupBody;
}

export interface IDeleteTaskGroupProps {
    id: string;
}

/**
 * controller
 */

export type IPaginationTaskGroupsRequest = Request<
    {},
    {},
    {},
    {
        page?: string;
        perPage?: string;
        field: keyof TaskGroup;
        sort: "asc" | "desc";
        search?: string;
    }
>;

export type ITaskGroupDetailsRequest = Request<{ id: string }, {}, {}, {}>;

export type IUpdateTaskGroupRequest = Request<
    { id: string },
    {},
    updateTaskGroupBody,
    {}
>;

export type ICreateTaskGroupRequest = Request<{}, {}, createTaskGroupBody>;
