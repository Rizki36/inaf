import {
    IPaginationTaskWorkerProps,
    ICreateTaskWorkerServiceProps,
    IDeleteTaskWorkerProps,
    IUpdateTaskWorkerProps,
} from "./task_worker.dto";
import { PrismaClient, Prisma, TaskWorker } from "@prisma/client";

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

/** pagination task workers */
export const taskWorkerPaginationService = async (
    props: IPaginationTaskWorkerProps
) => {
    const { page, perPage, sortPage } = props;

    const orderKey: keyof TaskWorker =
        [].find((i) => i === sortPage?.field) ?? "taskId";

    const where: Prisma.TaskWorkerFindManyArgs["where"] = {};

    const data = await prisma.taskWorker.findMany({
        skip: page * perPage,
        take: perPage,
        select: {
            id: true,
            task: {
                select: {
                    id: true,
                    name: true,
                },
            },
            user: {
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

    const totalRows = await prisma.taskWorker.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

/** create task worker */
export const createTaskWorkerService = async (
    props: ICreateTaskWorkerServiceProps
) => {
    const { body } = props;

    const data = await prisma.taskWorker.create({
        data: {
            taskId: body.taskId,
            userId: body.userId,
        },
    });

    return data;
};

/** update task worker */
export const updateTaskWorkerService = async (
    props: IUpdateTaskWorkerProps
) => {
    const { id, body } = props;

    const data = await prisma.taskWorker.update({
        data: {
            userId: body.userId,
            taskId: body.taskId,
        },
        where: {
            id,
        },
    });

    return data;
};

/** delete task worker */
export const deleteTaskWorkerService = async (
    props: IDeleteTaskWorkerProps
) => {
    const { id } = props;
    const data = await prisma.taskWorker.delete({
        where: {
            id,
        },
    });

    return data;
};

export const taskWorkerByTaskIdService = async (taskId: string) => {
    console.log("task", taskId);
    const data = await prisma.taskWorker.findMany({
        where: {
            taskId,
        },
        include: {
            user: {
                select: {
                    name: true,
                    Position: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return data;
};
