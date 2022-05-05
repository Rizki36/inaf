import {
    ICreatePositionProps,
    IDeletePositionProps,
    IPaginationPositionsProps,
    IPositionDetailsProps,
    IUpdatePositionProps,
} from "./position.dto";
import { PrismaClient, Prisma, Position } from "@prisma/client";

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

/** pagination position */
export const paginationPositionService = async (
    props: IPaginationPositionsProps
) => {
    const { page, perPage, sortPage, search } = props;

    const orderKey: keyof Position =
        [].find((i) => i === sortPage?.field) ?? "createdAt";

    const where: Prisma.PositionFindManyArgs["where"] = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    const data = await prisma.position.findMany({
        ...(perPage > -1 && { skip: page * perPage, take: perPage }),
        select: {
            id: true,
            name: true,
            description: true,
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

    const totalRows = await prisma.position.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

/** position details */
export const positionDetailsService = async (props: IPositionDetailsProps) => {
    const { id } = props;

    const data = await prisma.position.findFirst({
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

/** create position */
export const createPositionService = async (props: ICreatePositionProps) => {
    const { body } = props;

    const data = await prisma.position.create({
        data: {
            name: body.name,
            description: body.description,
        },
    });

    return data;
};

/** update position */
export const updatePositionService = async (props: IUpdatePositionProps) => {
    const { id, body } = props;

    const data = await prisma.position.update({
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

/** delete position */
export const deletePositionService = async (props: IDeletePositionProps) => {
    const { id } = props;

    const data = await prisma.position.delete({
        where: {
            id,
        },
    });

    return data;
};
