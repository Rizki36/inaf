import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";
import { GridRowModel, GridSortModel } from "@mui/x-data-grid";
import theme from "@/configs/themes";
import {
    Theme,
    ThemeOptions,
    TypographyOptions,
    Components,
    Palette as DefaultPalette,
} from "@mui/material";

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
    sort?: GridSortModel;
    search?: string;
}

export interface SortProps {
    field: string;
    sort: "asc" | "desc";
}

export interface PaginationProps {
    page: number;
    perPage: number;
    sortPage?: SortProps;
    search?: string;
}

export interface EditProp {
    edit: boolean;
    toggleEdit: () => void;
}

export type ICustomization = {
    isOpen: string[];
    fontFamily: string;
    borderRadius: number;
    opened: boolean;
};

export interface CustomComponents {
    colors: Record<string, string>;
    heading: string;
    paper: string;
    backgroundDefault: string;
    background: string;
    darkTextPrimary: string;
    darkTextSecondary: string;
    textDark: string;
    menuSelected: string;
    menuSelectedBack: string;
    divider: string;
    customization: ICustomization;
}

export interface CustomTypography extends TypographyOptions {
    customInput: any;
    mainContent: any;
    menuCaption: any;
    subMenuCaption: any;
    commonAvatar: any;
    smallAvatar: any;
    mediumAvatar: any;
    largeAvatar: any;
}

export interface CustomPalette extends Palette {}

declare module "@mui/material/styles" {
    interface Theme {
        palette: Palette;
        typography: CustomTypography;
        componenets: CustomComponents;
    }

    interface Palette extends DefaultPalette {
        orange: {
            dark: string;
            light: string;
        };
    }

    interface Typography {}

    // allow configuration using `createTheme`
    interface ThemeOptions {}
}
