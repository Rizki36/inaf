import { TaskWorker } from "@prisma/client";
import { Request } from "express";
import { AsyncReturnType, PaginationProps } from "../../../@types";
import {
    createTaskWorkerService,
    deleteTaskWorkerService,
    taskWorkerByTaskIdService,
    taskWorkerPaginationService,
    updateTaskWorkerService,
} from "./task_worker.service";

/** pagination task worker */
export type getPaginationTaskWorkersDTO = AsyncReturnType<
    typeof taskWorkerPaginationService
>;

/** create task worker */
export interface createTaskWorkerBody
    extends Pick<TaskWorker, "userId" | "taskId"> {}
export type createTaskWorkerDTO = AsyncReturnType<
    typeof createTaskWorkerService
>;

/** update task worker */
export interface updateTaskWorkerBody
    extends Pick<TaskWorker, "userId" | "taskId"> {}
export type updateTaskWorkerDTO = AsyncReturnType<
    typeof updateTaskWorkerService
>;

/** delete task worker */
export type deleteTaskWorkerDTO = AsyncReturnType<
    typeof deleteTaskWorkerService
>;

export type taskWorkerByTaskIdDTO = AsyncReturnType<
    typeof taskWorkerByTaskIdService
>;

/**
 * service
 */

export interface IPaginationTaskWorkerProps
    extends PaginationProps<TaskWorker> {}

export interface ICreateTaskWorkerServiceProps {
    body: createTaskWorkerBody;
}

export interface IUpdateTaskWorkerProps {
    id: string;
    body: updateTaskWorkerBody;
}

export interface IDeleteTaskWorkerProps {
    id: string;
}

/**
 * controller
 */

export type IPaginationTaskWorkerRequest = Request<
    {},
    {},
    {},
    {
        page?: string;
        perPage?: string;
        field: keyof TaskWorker;
        sort: "asc" | "desc";
        search?: string;
    }
>;

export type IUpdateTaskWorkerRequest = Request<
    { id: string },
    {},
    updateTaskWorkerBody,
    {}
>;

export type ICreateTaskWorkerRequest = Request<{}, {}, createTaskWorkerBody>;
