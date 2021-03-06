import backendApi from "configs/api/backendApi";
import {
    getPaginationProjectsDTO,
    IResponse,
    getProjectDetailsDTO,
} from "server";
import { PaginationProps } from "../../@types/index";
import useSWR from "swr";

interface getProjectsProps extends PaginationProps {
    enableFetch?: boolean;
}
export const useProjects = (props: getProjectsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = { sort: null, field: null },
        search,
        enableFetch = true,
    } = props;

    const { sort, field } = sortPage;

    const { data, error, mutate } = useSWR(
        ["admin/projects", page, perPage, sort, search, enableFetch],
        (url, page, perPage, sort, search, enableFetch) => {
            if (!enableFetch) return;

            return backendApi
                .get<getPaginationProjectsDTO>(url, {
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

interface GetProjectDetailsProps {
    id: string;
}

export const useProjectDetails = (props: GetProjectDetailsProps) => {
    const { id } = props;
    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi
            .get<IResponse<getProjectDetailsDTO>>(`admin/projects/${id}`)
            .then((res) => res.data);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
