import backendApi from "configs/api/backendApi";
import { getPaginationProjectsDTO, getProjectDetailsDTO } from "server";
import { PaginationProps } from "../../@types/index";
import useSWR from "swr";

interface getProjectsProps extends PaginationProps {}
export const useProjects = (props: getProjectsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = {sort : null,field:null},
        search,
    } = props;

    const {sort,field} = sortPage

    const { data, error, mutate } = useSWR(
        ["admin/projects", page, perPage, sort, search],
        (url, page, perPage, sort, search) => {
            return backendApi.get<getPaginationProjectsDTO>(url, {
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

interface GetProjectDetailsProps {
    id: string;
}

export const useProjectDetails = (props: GetProjectDetailsProps) => {
    const { id } = props;
    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi.get<getProjectDetailsDTO>(`admin/projects/${id}`);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
