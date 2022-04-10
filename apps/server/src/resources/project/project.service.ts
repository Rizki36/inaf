import {
    IPaginationProjectProps,
    ICreateProjectProps,
    IUpdateProjectProps,
    IDeleteProjectProps,
    IProjectDetailsProps,
} from "./project.dto";
import { PrismaClient, Prisma, Project } from "@prisma/client";

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

/** pagination positions */
export const paginationProjectService = async (
    props: IPaginationProjectProps
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

    const totalRows = await prisma.project.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

/** project details */
export const projectDetailsService = async (props: IProjectDetailsProps) => {
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

    return data;
};

/** create project */
export const createProjectService = async (props: ICreateProjectProps) => {
    const { body } = props;

    const data = await prisma.project.create({
        data: {
            name: body.name,
            description: body.description,
        },
    });

    return data;
};

/** update project */
export const updateProjectService = async (props: IUpdateProjectProps) => {
    const { id, body } = props;

    const data = await prisma.project.update({
        data: {
            name: body.name,
            description: body.description,
        },
        where: {
            id,
        },
    });

    return data;
};

/** delete project */
export const deleteProjectService = async (props: IDeleteProjectProps) => {
    const { id } = props;

    const data = await prisma.project.delete({
        where: {
            id,
        },
    });

    return data;
};
