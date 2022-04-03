import backendApi from "configs/api/backendApi";
import {
    createTeamBody,
    createTeamDTO,
    deleteTeamDTO,
    deleteTeamParams,
} from "server";

export const createTeam = (data: createTeamBody) => {
    return backendApi.post<createTeamDTO>(`/admin/teams`, data);
};

interface IDeleteTeamProps extends deleteTeamParams {}
/** delete team based on projectId and userId  */
export const deleteTeam = (props: IDeleteTeamProps) => {
    const { projectId, userId } = props;
    return backendApi.delete<deleteTeamDTO>(
        `/admin/teams/projects/${projectId}/users/${userId}`
    );
};
