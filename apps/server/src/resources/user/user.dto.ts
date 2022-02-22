import { User } from "@prisma/client";
import { AsyncReturnType } from "./../../../@types/index.d";
import {
    deleteUserService,
    getPaginationUsersService,
    getUserDetailsService,
    updateUserDetailsService,
} from "./user.service";

export type getPaginationUsersDTO = ReturnType<
    typeof getPaginationUsersService
>;

export type getUserDetailsDTO = AsyncReturnType<typeof getUserDetailsService>;

export type updateUserDetailsBody = Pick<
    User,
    "name" | "username" | "email" | "description"
>;

export type updateUserDetailsSDTO = AsyncReturnType<
    typeof updateUserDetailsService
>;

export type deleteUserDTO = AsyncReturnType<typeof deleteUserService>;
