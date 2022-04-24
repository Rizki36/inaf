import useSWR from "swr";
import backendApi from "configs/api/backendApi";
import { PaginationProps } from "../../@types/index";
import {
    getPaginationTaskWorkersDTO,
    IResponse,
    taskWorkerByTaskIdDTO,
} from "server";

interface IUseTaskWorkersProps extends PaginationProps {}
export const useTaskWorkers = (props: IUseTaskWorkersProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = { sort: null, field: null },
        search,
    } = props;
    const { sort, field } = sortPage;

    const { data, error, mutate } = useSWR(
        ["admin/task-workers", page, perPage, sort, search],
        (url, page, perPage, sort, search) => {
            return backendApi
                .get<getPaginationTaskWorkersDTO>(url, {
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

export const useTaskWorkersByTaskId = (taskId: string) => {
    const { data, error, mutate } = useSWR(
        ["admin/task-workers/tasks", taskId],
        (url, taskId) => {
            return backendApi
                .get<IResponse<taskWorkerByTaskIdDTO>>(`${url}/${taskId}`)
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
