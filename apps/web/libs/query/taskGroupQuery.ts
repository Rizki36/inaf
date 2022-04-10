import useSWR from "swr";
import backendApi from "configs/api/backendApi";
import { IResponse } from "server";
import { PaginationProps } from "../../@types/index";
import { getPaginationTaskGroupsDTO, getTaskGroupDetailsDTO } from "server";

interface IUseTaskGroupsProps extends PaginationProps {}
export const useTaskGroups = (props: IUseTaskGroupsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = { sort: null, field: null },
        search,
    } = props;
    const { sort, field } = sortPage;

    const { data, error, mutate } = useSWR(
        ["admin/task-groups", page, perPage, sort, search],
        (url, page, perPage, sort, search) => {
            return backendApi
                .get<getPaginationTaskGroupsDTO>(url, {
                    params: {
                        page,
                        perPage,
                        sort,
                        field,
                        search,
                    },
                })
                .then((res) => res.data);
        }
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

interface ITaskGroupDetailsProps {
    id: string;
}

export const useTaskGroupDetails = (props: ITaskGroupDetailsProps) => {
    const { id } = props;

    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi
            .get<IResponse<getTaskGroupDetailsDTO>>(`admin/task-groups/${id}`)
            .then((res) => res.data);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
