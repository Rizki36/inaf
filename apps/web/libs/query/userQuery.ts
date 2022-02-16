import backendApi from "configs/api/backendApi";
import { getPaginationUsersDTO } from "server";

export const getUsers = async ({ page = 1, perPage = 40 }) => {
    const res = await backendApi.get<getPaginationUsersDTO>("admin/users", {
        params: {
            page,
            perPage,
        },
    });

    return res.data;
};
