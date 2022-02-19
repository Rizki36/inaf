import { AsyncReturnType } from "./../../../@types/index.d";
import {
    getPaginationUsersService,
    getUserDetailsService,
} from "./user.service";

export type getPaginationUsersDTO = ReturnType<
    typeof getPaginationUsersService
>;

export type getUserDetailsDTO = AsyncReturnType<typeof getUserDetailsService>;
