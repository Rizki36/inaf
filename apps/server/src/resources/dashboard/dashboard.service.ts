import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

export const getDashboardService = async (props: { projectId?: string }) => {
    let { projectId } = props;

    /** when projectId not provided get last updated project */
    if (!projectId) {
        const project = await prisma.project.findFirst({
            orderBy: {
                updatedAt: "desc",
            },
        });

        projectId = project?.id;

        if (!projectId) throw new Error("No project found");
    }

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
        projectId,
        totalTask: totalTaskInProgress + totalTaskOpen + totalTaskDone,
        totalTaskOpen,
        totalTaskInProgress,
        totalTaskDone,
        totalUserInProject,
    };
};
