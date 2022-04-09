import {
    IPaginationTaskGroupsProps,
    ICreateTaskGroupServiceProps,
    IDeleteTaskGroupProps,
    ITaskGroupDetailsServiceProps,
    IUpdateTaskGroupProps,
} from "./task_group.dto";
import { PrismaClient, Prisma, Task, TaskGroup } from "@prisma/client";

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

/** pagination task groups */
export const taskGroupPaginationService = async (
    props: IPaginationTaskGroupsProps
) => {
    const { page, perPage, sortPage, search } = props;

    const orderKey: keyof TaskGroup =
        [].find((i) => i === sortPage?.field) ?? "createdAt";

    const where: Prisma.TaskGroupFindManyArgs["where"] = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    const data = await prisma.taskGroup.findMany({
        skip: page * perPage,
        take: perPage,
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            description: true,
            projectId: true,
            attachment: true,
        },
        orderBy: [
            {
                [orderKey]: sortPage?.sort ?? "asc",
            },
        ],
        where,
    });

    const totalRows = await prisma.taskGroup.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

/** details task group */
export const taskGroupDetailsService = async (
    props: ITaskGroupDetailsServiceProps
) => {
    const { id } = props;
    const data = await prisma.taskGroup.findFirst({
        select: {
            id: true,
            name: true,
            description: true,
            attachment: true,
            projectId: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            id,
        },
    });

    return data;
};

/** create task group */
export const createTaskGroupService = async (
    props: ICreateTaskGroupServiceProps
) => {
    const { body } = props;

    const data = await prisma.taskGroup.create({
        data: {
            name: body.name,
            description: body.description,
            projectId: body.projectId,
            attachment: body.attachment,
        },
    });

    return data;
};

/** update task group */
export const updateTaskGroupService = async (props: IUpdateTaskGroupProps) => {
    const { id, body } = props;

    const data = await prisma.taskGroup.update({
        data: {
            name: body.name,
            description: body.description,
            projectId: body.projectId,
            attachment: body.attachment,
        },
        where: {
            id,
        },
    });

    return data;
};

/** delete task group */
export const deleteTaskGroupService = async (props: IDeleteTaskGroupProps) => {
    const { id } = props;
    const data = await prisma.taskGroup.delete({
        where: {
            id,
        },
    });

    return data;
};
