import { createPositionBody, updatePositionDetailsBody } from "./position.dto";
import { PrismaClient, Prisma, Position } from "@prisma/client";
import { PaginationProps } from "../../../@types";
import { successResponse } from "../../helpers/methods";

interface getPaginationPositionsProps extends PaginationProps<Position> {}

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

// get pagination positions
export const getPaginationPositionsService = async (
    props: getPaginationPositionsProps
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

    const totalRows = await prisma.position.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

interface GetUPositionDetails {
    id: string;
}
// get position details
export const getPositionDetailsService = async (props: GetUPositionDetails) => {
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

    return successResponse<typeof data>({
        data: data,
    });
};

interface CreatePosition {
    body: createPositionBody;
}
export const createPositionService = async (props: CreatePosition) => {
    const { body } = props;

    const data = await prisma.position.create({
        data: {
            name: body.name,
            description: body.description,
        },
    });

    return successResponse<typeof data>({
        data,
    });
};

interface UpdatePositionDetails {
    id: string;
    body: updatePositionDetailsBody;
}
export const updatePositionDetailsService = async (
    props: UpdatePositionDetails
) => {
    const { id, body } = props;
    console.log(body);
    const data = await prisma.position.update({
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

interface DeletePosition {
    id: string;
}
export const deletePositionService = async (props: DeletePosition) => {
    const { id } = props;
    const data = await prisma.position.delete({
        where: {
            id,
        },
    });

    return successResponse<typeof data>({
        data,
    });
};
