import { User } from "@prisma/client";

export interface Errors {
    msg: string,
    errors?: { [key: string]: string }
}

export interface UserLogin implements Omit<User, "password"> {
}

export interface IResponse {
    status: boolean,
    message: string,
    data: Record<string, any> | null,
    errors: Record<string, any> | null
}