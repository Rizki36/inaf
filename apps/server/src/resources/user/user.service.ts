import { createUserBody, updateUserDetailsBody } from "./user.dto";
import { PrismaClient, User, Prisma } from "@prisma/client";
import { PaginationProps } from "../../../@types";
import { successResponse } from "../../helpers/methods";

interface getPaginationUsersProps extends PaginationProps<User> {}

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

// get pagination user
export const getPaginationUsersService = async (
    props: getPaginationUsersProps
) => {
    const { page, perPage, sortPage, search } = props;

    const orderKey: keyof User =
        [].find((i) => i === sortPage?.field) ?? "name";

    const where: Prisma.UserWhereInput = {};
    if (search) {
        where.OR = {
            name: { contains: search },
        };
    }

    console.log("where", where);
    const data = await prisma.user.findMany({
        skip: page * perPage,
        take: perPage,
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

    prisma.$on("query", (e) => {
        console.log("Query: " + e.query);
        console.log("Duration: " + e.duration + "ms");
    });

    const totalRows = await prisma.user.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};

interface GetUserDetails {
    id: string;
}
// get user details
export const getUserDetailsService = async (props: GetUserDetails) => {
    const { id } = props;
    const data = await prisma.user.findFirst({
        select: {
            id: true,
            name: true,
            username: true,
            description: true,
            email: true,
        },
        where: {
            id,
        },
    });

    return successResponse<typeof data>({
        data: data,
    });
};

interface UpdateUserDetails {
    id: string;
    body: updateUserDetailsBody;
}
export const updateUserDetailsService = async (props: UpdateUserDetails) => {
    const { id, body } = props;
    const data = await prisma.user.update({
        data: {
            name: body.name,
            username: body.username,
            email: body.email,
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

interface DeleteUser {
    id: string;
}
export const deleteUserService = async (props: DeleteUser) => {
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


interface CreateUser {
    body: createUserBody;
}
export const createUserService = async (props: CreateUser) => {
    const { body:{positionId,...body} } = props;

    const data = await prisma.user.create({
        select:{
            name:true
        },
        data: body
    });

    console.log('created',data)

    return successResponse<typeof data>({
        data,
    });
};