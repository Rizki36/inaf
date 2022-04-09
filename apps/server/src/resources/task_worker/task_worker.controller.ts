import { getOrderPage } from "../../helpers/pagination";
import { TaskWorker } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createTaskWorkerService,
    deleteTaskWorkerService,
    taskWorkerPaginationService,
    updateTaskWorkerService,
} from "./task_worker.service";
import {
    ICreateTaskWorkerRequest,
    IPaginationTaskWorkerRequest,
    IUpdateTaskWorkerRequest,
} from "./task_worker.dto";
import { createdResponse, successResponse } from "../../helpers/methods";

/** pagination task workers */
export const taskWorkerPagination = async (
    req: IPaginationTaskWorkerRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40", field, sort, search } = req.query;

    try {
        const data = await taskWorkerPaginationService({
            perPage: getPerPage(perPage),
            page: getPage(page),
            sortPage: getOrderPage<TaskWorker>({
                sortProps: { field, sort },
                filds: ["taskId", "userId"],
                defaultField: "taskId",
                defaultSort: "asc",
            }),
            search,
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

/** update task worker */
export const updateTaskWorker = async (
    req: IUpdateTaskWorkerRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { taskId, userId } = req.body;

        const data = await updateTaskWorkerService({
            id,
            body: {
                userId,
                taskId,
            },
        });

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** create task worker */
export const createTaskWorker = async (
    req: ICreateTaskWorkerRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { taskId, userId } = req.body;

        const taskWorker = await createTaskWorkerService({
            body: {
                userId,
                taskId,
            },
        });

        res.send(createdResponse(taskWorker));
    } catch (error) {
        next(error);
    }
};

/** delete task worker */
export const deleteTaskWorker = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const data = await deleteTaskWorkerService({
            id,
        });

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};
