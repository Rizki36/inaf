import backendApi from "configs/api/backendApi";
import { deleteTeamDTO, deleteTeamParams } from "server";

interface IDeleteTeamProps extends deleteTeamParams {}
/** delete team based on projectId and userId  */
export const deleteTeam = (props: IDeleteTeamProps) => {
    const { projectId, userId } = props;
    return backendApi.delete<deleteTeamDTO>(
        `/admin/teams/projects/${projectId}/users/${userId}`
    );
};
