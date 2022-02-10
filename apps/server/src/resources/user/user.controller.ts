import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient()

// get all user
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await prisma.user.findMany();
    res.send(users)
}

// create new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
    })
    res.send(user)
}

// update existing user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email } = req.body as User
    const user = await prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name, email
        }
    })

    res.send(user)
}

// delete user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const user = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(user)
}