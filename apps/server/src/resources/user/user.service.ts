import { PrismaClient } from "@prisma/client";
import { PaginationProps } from "../../../@types";

interface getPaginationUsersProps extends PaginationProps {}

const prisma = new PrismaClient();

// get pagination user
export const getPaginationUsersService = async (
    props: getPaginationUsersProps
) => {
    const { page, perPage } = props;

    const data = await prisma.user.findMany({
        skip: page * perPage,
        take: perPage,
        select: {
            id: true,
            username: true,
            name: true,
            Position: true,
        },
    });

    const totalRows = await prisma.user.count();

    return {
        totalRows,
        page,
        perPage,
        data,
    };
};
