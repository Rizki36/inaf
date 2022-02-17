import { PrismaClient, User } from "@prisma/client";
import { PaginationProps } from "../../../@types";

interface getPaginationUsersProps extends PaginationProps<User> {}

const prisma = new PrismaClient();

// get pagination user
export const getPaginationUsersService = async (
    props: getPaginationUsersProps
) => {
    const { page, perPage, sortPage } = props;

    const orderKey : keyof User = [].find(i=>i === sortPage?.field) ?? 'name';

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
                [orderKey]: sortPage?.sort ?? 'asc',
            },
        ],
    });

    const totalRows = await prisma.user.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};
