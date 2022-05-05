import {
    ICreateUserProps,
    IDeleteUserProps,
    IPaginationUserProps,
    IUpdateUserProps,
    IUserDetailsProps,
} from "./user.dto";
import { PrismaClient, User, Prisma } from "@prisma/client";
import { successResponse } from "../../helpers/methods";

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

/** user pagination service */
export const paginationUserService = async (props: IPaginationUserProps) => {
    const { page, perPage, sortPage, search } = props;

    const orderKey: keyof User =
        [].find((i) => i === sortPage?.field) ?? "name";

    const where: Prisma.UserWhereInput = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    const data = await prisma.user.findMany({
        ...(perPage > -1 && { skip: page * perPage, take: perPage }),
        select: {
            id: true,
            username: true,
            name: true,
            Position: true,
        },
        orderBy: [
            {
                [orderKey]: sortPage?.sort ?? "asc",
            },
        ],
        where,
    });

    const totalRows = await prisma.user.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

/** user details service */
export const userDetailsService = async (props: IUserDetailsProps) => {
    const { id } = props;
    const data = await prisma.user.findFirst({
        select: {
            id: true,
            name: true,
            username: true,
            description: true,
            email: true,
            positionId: true,
            Position: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            id,
        },
    });

    return data;
};

/** update user service */
export const updateUserService = async (props: IUpdateUserProps) => {
    const { id, body } = props;
    const data = await prisma.user.update({
        data: {
            name: body.name,
            username: body.username,
            email: body.email,
            description: body.description,
            positionId: body.positionId,
        },
        where: {
            id,
        },
    });

    return data;
};

/** delete user service */
export const deleteUserService = async (props: IDeleteUserProps) => {
    const { id } = props;

    const data = await prisma.user.delete({
        where: {
            id,
        },
    });

    return successResponse<typeof data>({
        data,
    });
};

/** create user service */
export const createUserService = async (props: ICreateUserProps) => {
    const { body } = props;

    const data = await prisma.user.create({
        select: {
            name: true,
        },
        data: body,
    });

    return data;
};

/** user projects service */
export const userProjectsService = async ({ userId }: { userId: string }) => {
    /** find project where are user in project team */
    const data = await prisma.project.findMany({
        where: {
            teams: {
                some: {
                    userId,
                },
            },
        },
    });

    return data;
};
