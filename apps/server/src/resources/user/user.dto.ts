import { User } from "@prisma/client";
import { Request } from "express";
import {
    AsyncReturnType,
    IResponse,
    PaginationProps,
} from "./../../../@types/index.d";
import {
    deleteUserService,
    paginationUserService,
    userDetailsService,
    updateUserService,
    createUserService,
    userProjectsService,
} from "./user.service";

export type getPaginationUsersDTO = AsyncReturnType<
    typeof paginationUserService
>;

export type getUserDetailsDTO = AsyncReturnType<typeof userDetailsService>;

export type updateUserDetailsBody = Pick<
    User,
    "name" | "username" | "email" | "description" | "positionId"
>;

export type createUserBody = Pick<
    User,
    "name" | "description" | "username" | "password" | "email" | "positionId"
>;

export type createUserDTO = AsyncReturnType<typeof createUserService>;

export type updateUserDetailsSDTO = AsyncReturnType<typeof updateUserService>;

export type deleteUserDTO = AsyncReturnType<typeof deleteUserService>;

export type UserProjectDTO = IResponse<
    AsyncReturnType<typeof userProjectsService>
>;


/**
 * controller
 */

export type IPaginationUserRequest = Request<
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
>;

/**
 * controller
 */

export type IUserDetailsRequest = Request<{ id: string }, {}, {}, {}>;

export type IUpdateUserRequest = Request<
    { id: string },
    {},
    updateUserDetailsBody,
    {}
>;

export type ICreateUserRequest = Request<{}, {}, createUserBody>;

/**
 * service
 */
export interface IPaginationUserProps extends PaginationProps<User> {}
export interface IUserDetailsProps {
    id: string;
}

export interface IUpdateUserProps {
    id: string;
    body: updateUserDetailsBody;
}

export interface IDeleteUserProps {
    id: string;
}

export interface ICreateUserProps {
    body: createUserBody;
}
