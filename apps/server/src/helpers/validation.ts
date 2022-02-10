import { PrismaClient, User } from '@prisma/client';

// define prisma client
const prisma = new PrismaClient()

interface isExistUserByProps<T> {
    column: keyof T,
    value: T[keyof T]
}

export const isExistUserBy = async (props: isExistUserByProps<User>) => {
    const { column, value } = props
    try {
        const user = await prisma.user.findFirst({
            where: {
                [column]: value
            }
        })

        if (!user) return false

        return true
    } catch (error) {
        return false
    }
}