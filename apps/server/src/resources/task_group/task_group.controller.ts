import { getOrderPage } from "../../helpers/pagination";
import { TaskGroup } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createTaskGroupService,
    deleteTaskGroupService,
    taskGroupPaginationService,
    taskGroupDetailsService,
    updateTaskGroupService,
} from "./task_group.service";
import {
    ICreateTaskGroupRequest,
    IPaginationTaskGroupsRequest,
    ITaskGroupDetailsRequest,
    IUpdateTaskGroupRequest,
} from "./task_group.dto";
import { createdResponse, successResponse } from "../../helpers/methods";

/** pagination task groups */
export const taskGroupPagination = async (
    req: IPaginationTaskGroupsRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40", field, sort, search } = req.query;

    try {
        const data = await taskGroupPaginationService({
            perPage: getPerPage(perPage),
            page: getPage(page),
            sortPage: getOrderPage<TaskGroup>({
                sortProps: { field, sort },
                filds: ["createdAt", "name"],
                defaultField: "name",
                defaultSort: "asc",
            }),
            search,
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

/** details task group */
export const taskGroupDetails = async (
    req: ITaskGroupDetailsRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await taskGroupDetailsService({
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

/** update task group */
export const updateTaskGroup = async (
    req: IUpdateTaskGroupRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const data = await updateTaskGroupService({
            id,
            body,
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

/** create task group */
export const createTaskGroup = async (
    req: ICreateTaskGroupRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { name, description, attachment, projectId } = req.body;
        const taskGroup = await createTaskGroupService({
            body: {
                name,
                description,
                attachment,
                projectId,
            },
        });

        res.send(createdResponse(taskGroup));
    } catch (error) {
        next(error);
    }
};

/** delete task group */
export const deleteTaskGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await deleteTaskGroupService({
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
