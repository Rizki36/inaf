import { IOption } from "@/types/index";
import { AxiosResponse } from "axios";
import { IResponsePagination } from "server";

interface IGetOptionsFromPaginationQuery<T> {
    isError: boolean;
    isLoading: boolean;
    data: AxiosResponse<IResponsePagination<T>>;
    label: keyof T;
    value: keyof T;
}
/** get project options from query  */
export function getOptionsFromPaginationQuery<T>(
    props: IGetOptionsFromPaginationQuery<T>
) {
    const { isError, isLoading, data, label, value } = props;

    if (!isError && !isLoading && data.data.data) {
        const options = data.data.data.map((item) => {
            const option: IOption = {
                label: item[label] + "",
                value: item[value] + "",
            };

            return option;
        });

        return options;
    } else {
        return [];
    }
}
