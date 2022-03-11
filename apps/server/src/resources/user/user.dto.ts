import { User } from "@prisma/client";
import { AsyncReturnType } from "./../../../@types/index.d";
import {
    deleteUserService,
    getPaginationUsersService,
    getUserDetailsService,
    updateUserDetailsService,
    createUserService
} from "./user.service";

export type getPaginationUsersDTO = AsyncReturnType<
    typeof getPaginationUsersService
>;

export type getUserDetailsDTO = AsyncReturnType<typeof getUserDetailsService>;

export type updateUserDetailsBody = Pick<
    User,
    "name" | "username" | "email" | "description"
>;

export type createUserBody = Pick<User, "name" | "description" | "username" | "password" | "email" | "positionId">;

export type createUserDTO = AsyncReturnType<typeof createUserService>;

export type updateUserDetailsSDTO = AsyncReturnType<
    typeof updateUserDetailsService
>;

export type deleteUserDTO = AsyncReturnType<typeof deleteUserService>;
