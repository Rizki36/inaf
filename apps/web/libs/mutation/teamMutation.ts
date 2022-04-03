import backendApi from "configs/api/backendApi";
import {
    createTeamBody,
    createTeamDTO,
    deleteTeamDTO,
    deleteTeamParams,
    updateTeamBody,
    updateTeamParams,
} from "server";

export const createTeam = (data: createTeamBody) => {
    return backendApi.post<createTeamDTO>(`/admin/teams`, data);
};

interface IUpdateTeamProps {
    params: updateTeamParams;
    data: updateTeamBody;
}
export const updateTeam = ({
    params: { projectId, userId },
    data,
}: IUpdateTeamProps) => {
    return backendApi.patch<createTeamDTO>(
        `/admin/teams/projects/${projectId}/users/${userId}`,
        data
    );
};

interface IDeleteTeamProps extends deleteTeamParams {}
/** delete team based on projectId and userId  */
export const deleteTeam = (props: IDeleteTeamProps) => {
    const { projectId, userId } = props;
    return backendApi.delete<deleteTeamDTO>(
        `/admin/teams/projects/${projectId}/users/${userId}`
    );
};
