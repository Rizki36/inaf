import { Prisma, Task } from "@prisma/client";
import { Request } from "express";
import { AsyncReturnType, PaginationProps } from "../../../@types";
import {
    createTaskService,
    deleteTaskService,
    taskPaginationService,
    taskDetailsService,
    updateTaskService,
} from "./task.service";

/** pagination task */
export type getPaginationTasksDTO = AsyncReturnType<
    typeof taskPaginationService
>;

/** details task */
export type getTaskDetailsDTO = AsyncReturnType<typeof taskDetailsService>;

/** create task */
export interface createTaskBody
    extends Pick<
        Task,
        | "name"
        | "description"
        | "taskGroupId"
        | "projectId"
        | "beginAt"
        | "finishAt"
    > {
    attachment: Prisma.InputJsonValue;
}
export type createTaskDTO = AsyncReturnType<typeof createTaskService>;

/** update task */
export interface updateTaskBody
    extends Pick<
        Task,
        | "name"
        | "description"
        | "taskGroupId"
        | "projectId"
        | "beginAt"
        | "finishAt"
    > {
    attachment: Prisma.InputJsonValue;
}
export type updateTaskDTO = AsyncReturnType<typeof updateTaskService>;

/** delete task */
export type deleteTaskDTO = AsyncReturnType<typeof deleteTaskService>;

/**
 * service
 */

export interface IPaginationTasksProps extends PaginationProps<Task> {}

export interface ITaskDetailsServiceProps {
    id: string;
}

export interface ICreateTaskServiceProps {
    body: createTaskBody;
}

export interface IUpdateTaskProps {
    id: string;
    body: updateTaskBody;
}

export interface IDeleteTaskProps {
    id: string;
}

/**
 * controller
 */

export type IPaginationTasksRequest = Request<
    {},
    {},
    {},
    {
        page?: string;
        perPage?: string;
        field: keyof Task;
        sort: "asc" | "desc";
        search?: string;
    }
>;

export type ITaskDetailsRequest = Request<{ id: string }, {}, {}, {}>;

export type IUpdateTaskRequest = Request<
    { id: string },
    {},
    updateTaskBody,
    {}
>;

export type ICreateTaskRequest = Request<{}, {}, createTaskBody>;
