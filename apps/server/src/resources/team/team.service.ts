import { createTeamBody, updateTeamBody, updateTeamParams } from "./team.dto";
import { PrismaClient } from "@prisma/client";

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

/** get teams by project service */
export const getTeamsByProjectService = async (projectId: string) => {
    const data = await prisma.team.findMany({
        select: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
            position: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: {
            projectId,
        },
    });

    return data;
};

interface ICreateTeamProps {
    body: createTeamBody;
}
/** create team service */
export const createTeamService = async (props: ICreateTeamProps) => {
    const { body } = props;

    const data = await prisma.team.create({
        data: body,
    });

    return data;
};

interface IUpdateTeamProps {
    params: updateTeamParams;
    body: updateTeamBody;
}
/** update team service, based on projectId and userId */
export const updateTeamService = async (props: IUpdateTeamProps) => {
    const {
        params: { projectId, userId },
        body: { positionId },
    } = props;

    const user = await prisma.team.update({
        where: {
            projectId_userId: {
                projectId,
                userId,
            },
        },
        data: {
            positionId,
        },
    });

    return user;
};

interface IDeleteTeamProps {
    userId: string;
    projectId: string;
}
/** delete team service, based on projectId and userId */
export const deleteTeamService = async (props: IDeleteTeamProps) => {
    const { userId, projectId } = props;

    const data = await prisma.team.delete({
        where: {
            projectId_userId: {
                userId,
                projectId,
            },
        },
    });

    return data;
};
