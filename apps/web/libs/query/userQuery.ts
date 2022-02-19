import backendApi from "configs/api/backendApi";
import { getPaginationUsersDTO, getUserDetailsDTO } from "server";
import { PaginationProps } from "../../@types/index";
import useSWR from "swr";

interface getUsetsProps extends PaginationProps {}
export const getUsers = async (props: getUsetsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage: { sort, field },
        search,
    } = props;

    const res = await backendApi.get<getPaginationUsersDTO>("admin/users", {
        params: {
            page,
            perPage,
            sort,
            field,
            search,
        },
    });

    return res.data;
};

interface GetUserDetailsProps {
    id: string;
}

export const useUserDetails = (props: GetUserDetailsProps) => {
    const { id } = props;
    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi.get<getUserDetailsDTO>(`admin/users/${id}`);
    });
    console.log(id, data, error);
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
