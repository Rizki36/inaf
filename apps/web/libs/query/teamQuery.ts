import backendApi from "configs/api/backendApi";
import {
    getTeamsByProjectDTO,
    getTeamsByProjectParams,
    IResponse,
} from "server";
import useSWR from "swr";

interface IUseTeamsByProjectProps extends getTeamsByProjectParams {}
/** get teams based on project id */
export const useTeamsByPorject = (props: IUseTeamsByProjectProps) => {
    const { projectId } = props;

    /** hook destruction to get data from api */
    const { data, error, mutate } = useSWR(
        [`admin/teams/projects/${projectId}/users`],
        (url) => {
            return backendApi
                .get<IResponse<getTeamsByProjectDTO>>(url)
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
