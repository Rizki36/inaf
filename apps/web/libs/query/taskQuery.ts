import useSWR from "swr";
import backendApi from "configs/api/backendApi";
import { IResponse } from "server";
import { PaginationProps } from "../../@types/index";
import { getPaginationTasksDTO, getTaskDetailsDTO } from "server";

interface IUseTasksProps extends PaginationProps {
    projectId?: string;
}
export const useTasks = (props: IUseTasksProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = { sort: null, field: null },
        search,
        projectId,
    } = props;
    const { sort, field } = sortPage;

    const { data, error, mutate } = useSWR(
        ["admin/tasks", page, perPage, sort, search, projectId],
        (url, page, perPage, sort, search, projectId) => {
            return backendApi
                .get<getPaginationTasksDTO>(url, {
                    params: {
                        page,
                        perPage,
                        sort,
                        field,
                        search,
                        projectId,
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

interface IUseTaskDetailsProps {
    id: string;
}

export const useTaskDetails = (props: IUseTaskDetailsProps) => {
    const { id } = props;

    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi
            .get<IResponse<getTaskDetailsDTO>>(`admin/tasks/${id}`)
            .then((res) => res.data);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
