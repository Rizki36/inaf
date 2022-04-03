import backendApi from "configs/api/backendApi";
import { getPaginationUsersDTO, getUserDetailsDTO } from "server";
import { PaginationProps } from "../../@types/index";
import useSWR from "swr";

interface getUsetsProps extends PaginationProps {}
export const useUsers = (props: getUsetsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = { sort: null, field: null },
        search,
    } = props;

    const { sort, field } = sortPage;

    const { data, error, mutate } = useSWR(
        ["admin/users", page, perPage, sort, search],
        (url, page, perPage, sort, search) => {
            return backendApi.get<getPaginationUsersDTO>(url, {
                params: {
                    page,
                    perPage,
                    sort,
                    field,
                    search,
                },
            });
        }
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

interface GetUserDetailsProps {
    id: string;
}

export const useUserDetails = (props: GetUserDetailsProps) => {
    const { id } = props;
    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi.get<getUserDetailsDTO>(`admin/users/${id}`);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

export const useProfile = () => {
    const { data, error, mutate, isValidating } = useSWR(
        "account",
        (url) =>
            backendApi.get<getUserDetailsDTO>(url).then((res) => res.data.data),
        {
            shouldRetryOnError: false,
        }
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
        isValidating,
    };
};
