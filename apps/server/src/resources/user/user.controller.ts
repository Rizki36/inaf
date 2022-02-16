import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import { getPaginationUsersService } from "./user.service";

const prisma = new PrismaClient();

// get all user
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await prisma.user.findMany();
    res.send(users);
};

// get pagination user
export const getPaginationUsers = async (
    req: Request<{}, {}, {}, { page?: string; perPage?: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40" } = req.query;

    try {
        const data = await getPaginationUsersService({
            perPage: getPerPage(perPage),
            page: getPage(page),
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

// create new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        },
    });
    res.send(user);
};

// update existing user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email } = req.body as User;
    const user = await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            name,
            email,
        },
    });

    res.send(user);
};

// delete user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const user = await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    });
    res.send(user);
};
