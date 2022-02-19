import { Prisma, PrismaClient, User } from "@prisma/client";

// define prisma client
const prisma = new PrismaClient();

interface isExistUserByProps<T> {
    column: keyof T;
    value: T[keyof T];
    id?: string;
}

export const isExistUserBy = async (props: isExistUserByProps<User>) => {
    const { column, value, id } = props;
    try {
        const where: Prisma.UserWhereInput = {
            [column]: value,
        };

        if (id) {
            where.NOT = {
                id,
            };
        }

        const user = await prisma.user.findFirst({
            where,
        });

        if (!user) return false;

        return true;
    } catch (error) {
        return false;
    }
};
