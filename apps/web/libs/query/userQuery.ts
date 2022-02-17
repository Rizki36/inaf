import backendApi from "configs/api/backendApi";
import { getPaginationUsersDTO } from "server";
import { PaginationProps } from "../../@types/index";

interface getUsetsProps extends PaginationProps {}

export const getUsers = async (props: getUsetsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage: { sort, field },
    } = props;

    const res = await backendApi.get<getPaginationUsersDTO>("admin/users", {
        params: {
            page,
            perPage,
            sort,
            field,
        },
    });

    return res.data;
};
