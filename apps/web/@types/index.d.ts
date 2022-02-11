import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";

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
