import { PaginationProps, SortProps } from "../../@types/index.d";
export const getPage = (page: string) => {
    const pageInt = parseInt(page);
    if (pageInt < 0) return 0;
    return pageInt;
};

export const getPerPage = (perPage: string) => {
    const perPageInt = parseInt(perPage);
    return perPageInt;
};

interface IGetOrderPage<T> {
    sortProps: SortProps<T>;
    filds: (keyof T)[];
    defaultField: keyof T;
    defaultSort: "asc" | "desc";
}

export const getOrderPage = <T>({
    sortProps,
    filds,
    defaultField,
    defaultSort,
}: IGetOrderPage<T>): SortProps<T> => {
    const orderKey: keyof T = filds.includes(sortProps.field)
        ? sortProps.field
        : defaultField;
    const orderSort = ["asc", "desc"].includes(sortProps.sort)
        ? sortProps.sort
        : defaultSort;

    return {
        field: orderKey,
        sort: orderSort,
    };
};
