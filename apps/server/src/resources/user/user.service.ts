import { PrismaClient, User, Prisma } from "@prisma/client";
import { PaginationProps } from "../../../@types";

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
