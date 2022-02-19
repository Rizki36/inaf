import { User } from "@prisma/client";

export interface Errors {
    msg: string;
    errors?: { [key: string]: string };
}

export interface UserLogin {}

export interface IResponse<T = Record<string, any>, P = Record<string, any>> {
    status: boolean;
    message: string;
    data: T | null;
    errors: P | null;
}

export interface SortProps<T> {
    field: keyof T;
    sort: "asc" | "desc";
}

export interface PaginationProps<T> {
    page: number;
    perPage: number;
    sortPage?: SortProps<T>;
    search?: string;
}

export type AsyncReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => Promise<infer U>
    ? U
    : T extends (...args: any) => infer U
    ? U
    : any;
