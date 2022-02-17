import { User } from "@prisma/client";

export interface Errors {
    msg: string;
    errors?: { [key: string]: string };
}

export interface UserLogin {}

export interface IResponse {
    status: boolean;
    message: string;
    data: Record<string, any> | null;
    errors: Record<string, any> | null;
}

export interface SortProps<T>{
    field: keyof T;
    sort: "asc" | "desc";
}

export interface PaginationProps<T> {
    page: number;
    perPage: number;
    sortPage?: SortProps<T>
}
