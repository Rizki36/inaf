import {
    IPaginationTasksProps,
    ICreateTaskServiceProps,
    IDeleteTaskProps,
    ITaskDetailsServiceProps,
    IUpdateTaskProps,
} from "./task.dto";
import { PrismaClient, Prisma, Task } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

prisma.$on("query", (e) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
});

/** pagination tasks */
export const taskPaginationService = async (props: IPaginationTasksProps) => {
    const { page, perPage, sortPage, search, projectId } = props;

    const orderKey: keyof Task =
        [].find((i) => i === sortPage?.field) ?? "createdAt";

    const where: Prisma.TaskFindManyArgs["where"] = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    if (projectId) {
        where.AND = {
            projectId,
        };
    }

    const data = await prisma.task.findMany({
        skip: page * perPage,
        take: perPage,
        select: {
            id: true,
            name: true,
            beginAt: true,
            finishAt: true,
            createdAt: true,
            updatedAt: true,
            description: true,
            attachment: true,
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
            taskGroup: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: [
            {
                [orderKey]: sortPage?.sort ?? "asc",
            },
        ],
        where,
    });

    const totalRows = await prisma.task.count({
        where,
    });

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

/** details task */
export const taskDetailsService = async (props: ITaskDetailsServiceProps) => {
    const { id } = props;
    const data = await prisma.task.findFirst({
        select: {
            id: true,
            name: true,
            description: true,
            attachment: true,
            createdAt: true,
            updatedAt: true,
            beginAt: true,
            finishAt: true,
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
            taskGroup: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: {
            id,
        },
    });

    return data;
};

/** create task */
export const createTaskService = async (props: ICreateTaskServiceProps) => {
    const { body } = props;

    const beginAt = body.beginAt ? new Date(body.beginAt) : null;
    const finishAt = body.finishAt ? new Date(body.finishAt) : null;

    const data = await prisma.task.create({
        data: {
            name: body.name,
            description: body.description,
            taskGroupId: body.taskGroupId,
            projectId: body.projectId,
            beginAt,
            finishAt,
            attachment: body.attachment,
        },
    });

    return data;
};

/** update task */
export const updateTaskService = async (props: IUpdateTaskProps) => {
    const { id, body } = props;
    const data = await prisma.task.update({
        data: {
            name: body.name,
            description: body.description,
            taskGroupId: body.taskGroupId,
            projectId: body.projectId,
            beginAt: body.beginAt,
            finishAt: body.finishAt,
            attachment: body.attachment,
        },
        where: {
            id,
        },
    });

    return data;
};

/** delete task */
export const deleteTaskService = async (props: IDeleteTaskProps) => {
    const { id } = props;
    const data = await prisma.task.delete({
        where: {
            id,
        },
    });

    return data;
};
