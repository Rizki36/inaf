import { getOrderPage } from "../../helpers/pagination";
import { Task } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createTaskService,
    deleteTaskService,
    taskPaginationService,
    taskDetailsService,
    updateTaskService,
} from "./task.service";
import {
    ICreateTaskRequest,
    IPaginationTasksRequest,
    ITaskDetailsRequest,
    IUpdateTaskRequest,
} from "./task.dto";
import { createdResponse, successResponse } from "../../helpers/methods";

/** pagination tasks */
export const taskPagination = async (
    req: IPaginationTasksRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let {
        page = "0",
        perPage = "40",
        field,
        sort,
        search,
        projectId,
    } = req.query;

    try {
        const data = await taskPaginationService({
            perPage: getPerPage(perPage),
            page: getPage(page),
            sortPage: getOrderPage<Task>({
                sortProps: { field, sort },
                filds: ["createdAt", "name"],
                defaultField: "name",
                defaultSort: "asc",
            }),
            search,
            ...(projectId && { projectId }),
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

/** details task */
export const taskDetails = async (
    req: ITaskDetailsRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await taskDetailsService({
            id,
        });

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/** update task */
export const updateTask = async (
    req: IUpdateTaskRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const data = await updateTaskService({
            id,
            body,
        });

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/** create task */
export const createTask = async (
    req: ICreateTaskRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const {
            name,
            description,
            attachment,
            beginAt,
            finishAt,
            taskGroupId,
            projectId,
        } = req.body;
        const task = await createTaskService({
            body: {
                name,
                description,
                attachment,
                beginAt,
                finishAt,
                taskGroupId,
                projectId,
            },
        });

        res.send(createdResponse(task));
    } catch (error) {
        next(error);
    }
};

/** delete task */
export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await deleteTaskService({
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
