import { getOrderPage } from "./../../helpers/pagination";
import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createUserService,
    deleteUserService,
    getPaginationUsersService,
    getUserDetailsService,
    updateUserDetailsService,
} from "./user.service";
import { createUserBody, updateUserDetailsBody } from "./user.dto";
import { createdResponse } from "../../helpers/methods";

const prisma = new PrismaClient();

// get all user
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await prisma.user.findMany();
    res.send(users);
};

// get pagination user
export const getPaginationUsers = async (
    req: Request<
        {},
        {},
        {},
        {
            page?: string;
            perPage?: string;
            field: keyof User;
            sort: "asc" | "desc";
            search?: string;
        }
    >,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40", field, sort, search } = req.query;

    try {
        const data = await getPaginationUsersService({
            perPage: getPerPage(perPage),
            page: getPage(page),
            sortPage: getOrderPage<User>({
                sortProps: { field, sort },
                filds: ["name", "username"],
                defaultField: "name",
                defaultSort: "asc",
            }),
            search,
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

// get user details
export const getUserDetails = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await getUserDetailsService({
            id,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get user details
export const updateUserDetails = async (
    req: Request<{ id: string }, {}, { body: updateUserDetailsBody }, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("body", body);

        const data = await updateUserDetailsService({
            id,
            body,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// create new user
export const createUser = async (req: Request<{}, {}, { body: createUserBody }>, res: Response,next:NextFunction): Promise<any> => {
    try {
        const {
            body: { name, description,email,password,positionId,username },
        } = req.body;
        const user = await createUserService({
            body: {
                name, description,email,password,positionId,username
            },
        });

        res.send(createdResponse(user));
    } catch (error) {
        next(error);
    }
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
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await deleteUserService({
            id,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
