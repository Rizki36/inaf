import { PrismaClient } from "@prisma/client";

interface getPaginationUsersProps {
    page: number;
    length: number;
}

const prisma = new PrismaClient();

// get pagination user
export const getPaginationUsersService = async (
    props: getPaginationUsersProps
) => {
    const { page, length } = props;

    const data = await prisma.user.findMany({
        skip: (page - 1) * length,
        take: length,
        select: {
            id: true,
            name: true,
        },
    });

    const totalRecords = await prisma.user.count();

    return {
        totalRecords,
        page,
        length,
        data,
    };
};
