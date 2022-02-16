import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";
import { GridRowModel } from "@mui/x-data-grid";

export type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
    layout?: ComponentType;
    auth?: AuthOptions;
};

export interface AuthOptions {
    mustLoggedIn?: boolean;
    redirectUnAuthenticated?: string;
    redirectAuthenticated?: string;
}

export interface IUser {
    id: number;
    img?: string;
    email?: string;
}

interface Input<T> {
    label: string;
    name: keyof T;
}

export type Inputs<T> = Record<keyof T, Input<T>>;

export interface RowsState {
    page: number;
    pageSize: number;
    rowCount: number;
    rows: GridRowModel[];
    loading: boolean;
}
