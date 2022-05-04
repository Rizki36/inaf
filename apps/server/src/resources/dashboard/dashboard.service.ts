import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

export const getDashboardService = async (props: { projectId: string }) => {
    const { projectId } = props;

    const totalTaskInProgress = await prisma.task.count({
        where: {
            projectId,
            status: "IN_PROGRESS",
        },
    });

    const totalTaskOpen = await prisma.task.count({
        where: {
            projectId,
            status: "OPEN",
        },
    });

    const totalTaskDone = await prisma.task.count({
        where: {
            projectId,
            status: "DONE",
        },
    });

    const totalUserInProject = await prisma.team.count({
        where: {
            projectId,
        },
    });

    return {
        totalTask: totalTaskInProgress + totalTaskOpen + totalTaskDone,
        totalTaskOpen,
        totalTaskInProgress,
        totalTaskDone,
        totalUserInProject,
    };
};
