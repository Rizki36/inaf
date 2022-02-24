import { updatePositionDetailsBody } from "./position.dto";
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

    const where: Prisma.PositionWhereInput = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    console.log("where", where);
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

    prisma.$on("query", (e) => {
        console.log("Query: " + e.query);
        console.log("Duration: " + e.duration + "ms");
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

interface UpdatePositionDetails {
    id: string;
    body: updatePositionDetailsBody;
}
export const updatePositionDetailsService = async (
    props: UpdatePositionDetails
) => {
    const { id, body } = props;
    const data = await prisma.position.update({
        data: {
            name: body.name,
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
