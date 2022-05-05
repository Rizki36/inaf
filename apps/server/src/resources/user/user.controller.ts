import { getOrderPage } from "./../../helpers/pagination";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createUserService,
    deleteUserService,
    paginationUserService,
    userDetailsService,
    updateUserService,
    userProjectsService,
} from "./user.service";
import {
    ICreateUserRequest,
    IPaginationUserRequest,
    IUpdateUserRequest,
    IUserDetailsRequest,
} from "./user.dto";
import { createdResponse, successResponse } from "../../helpers/methods";

/** pagination user  */
export const paginationUser = async (
    req: IPaginationUserRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40", field, sort, search } = req.query;

    try {
        const data = await paginationUserService({
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

/** user details */
export const userDetails = async (
    req: IUserDetailsRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await userDetailsService({
            id,
        });

        return res.send(
            successResponse({
                data: data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** update user */
export const updateUser = async (
    req: IUpdateUserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { name, username, email, description, positionId } = req.body;

        const data = await updateUserService({
            id,
            body: {
                name,
                username,
                email,
                description,
                positionId,
            },
        });

        return res.send(
            successResponse<typeof data>({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** create user */
export const createUser = async (
    req: ICreateUserRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { name, description, email, password, positionId, username } =
            req.body;
        const user = await createUserService({
            body: {
                name,
                description,
                email,
                password,
                positionId,
                username,
            },
        });

        res.send(createdResponse(user));
    } catch (error) {
        next(error);
    }
};

/** delete user */
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
        next(error);
    }
};

/** user projects */
export const userProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const data = await userProjectsService({
            userId: id,
        });

        return res.send(data);
    } catch (error) {
        next(error);
    }
};
