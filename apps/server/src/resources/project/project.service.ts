import { createProjectBody, updateProjectDetailsBody } from "./project.dto";
import { PrismaClient, Prisma, Project } from "@prisma/client";
import { PaginationProps } from "../../../@types";
import { successResponse } from "../../helpers/methods";

interface getPaginationPositionsProps extends PaginationProps<Project> {}

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

// get pagination positions
export const getPaginationProjectsService = async (
    props: getPaginationPositionsProps
) => {
    const { page, perPage, sortPage, search } = props;

    const orderKey: keyof Project =
        [].find((i) => i === sortPage?.field) ?? "createdAt";

    const where: Prisma.PositionFindManyArgs["where"] = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    const data = await prisma.project.findMany({
        skip: page * perPage,
        take: perPage,
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: [
            {
                [orderKey]: sortPage?.sort ?? "asc",
            },
        ],
        where,
    });

    prisma.$on("query", (e: Prisma.QueryEvent) => {
        console.log(`${e.duration} ms : ${e.query}`);
    });

    const totalRows = await prisma.project.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

interface GetProjectDetails {
    id: string;
}
// get position details
export const getProjectDetailsService = async (props: GetProjectDetails) => {
    const { id } = props;
    const data = await prisma.project.findFirst({
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            id,
        },
    });

    return successResponse<typeof data>({
        data: data,
    });
};

interface CreateProject {
    body: createProjectBody;
}
export const createProjectService = async (props: CreateProject) => {
    const { body } = props;

    const data = await prisma.project.create({
        data: {
            name: body.name,
            description: body.description,
        },
    });

    return successResponse<typeof data>({
        data,
    });
};

interface UpdateProjectDetails {
    id: string;
    body: updateProjectDetailsBody;
}
export const updateProjectDetailsService = async (
    props: UpdateProjectDetails
) => {
    const { id, body } = props;
    console.log(body);
    const data = await prisma.project.update({
        data: {
            name: body.name,
            description: body.description,
        },
        where: {
            id,
        },
    });

    return successResponse<typeof data>({
        data,
    });
};

interface DeleteProject {
    id: string;
}
export const deleteProjectService = async (props: DeleteProject) => {
    const { id } = props;
    const data = await prisma.project.delete({
        where: {
            id,
        },
    });

    return successResponse<typeof data>({
        data,
    });
};
