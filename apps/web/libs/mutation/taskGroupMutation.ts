import backendApi from "configs/api/backendApi";
import {
    createTaskGroupBody,
    createTaskGroupDTO,
    deleteTaskGroupDTO,
    updateTaskGroupBody,
    updateTaskGroupDTO,
} from "server";

interface ICreateTaskGroupProps {
    body: createTaskGroupBody;
}
export const createTaskGroup = (props: ICreateTaskGroupProps) => {
    const { body } = props;
    return backendApi.post<createTaskGroupDTO>(`/admin/task-groups`, body);
};

interface IPatchTaskGroupProps {
    id: string;
    body: updateTaskGroupBody;
}
export const patchTaskGroup = (props: IPatchTaskGroupProps) => {
    const { id, body } = props;
    return backendApi.patch<updateTaskGroupDTO>(
        `/admin/task-groups/${id}`,
        body
    );
};

export const deleteTaskGroup = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deleteTaskGroupDTO>(`/admin/task-groups/${id}`);
};
