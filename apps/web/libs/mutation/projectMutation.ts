import backendApi from "configs/api/backendApi";
import {
    createProjectBody,
    createProjectDTO,
    deleteProjectDTO,
    updateProjectDetailsBody,
    updateProjectDetailsDTO,
} from "server";

interface CreateProjectProps {
    body: createProjectBody;
}
export const createProject = (props: CreateProjectProps) => {
    const { body } = props;
    return backendApi.post<createProjectDTO>(`/admin/projects`, {
        body,
    });
};

interface PatchProjectDetailsProps {
    id: string;
    body: updateProjectDetailsBody;
}
export const patchProjectDetails = (props: PatchProjectDetailsProps) => {
    const { id, body } = props;
    return backendApi.patch<updateProjectDetailsDTO>(
        `/admin/projects/${id}`,
        {
            body,
        }
    );
};

export const deleteProject = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deleteProjectDTO>(`/admin/projects/${id}`);
};
