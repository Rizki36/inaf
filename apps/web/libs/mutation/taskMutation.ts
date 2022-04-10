import backendApi from "configs/api/backendApi";
import {
    createTaskBody,
    createTaskDTO,
    deleteTaskDTO,
    updateTaskBody,
    updateTaskDTO,
} from "server";

interface ICreateTaskProps {
    body: createTaskBody;
}
export const createTask = (props: ICreateTaskProps) => {
    const { body } = props;
    return backendApi.post<createTaskDTO>(`/admin/tasks`, body);
};

interface IPatchTaskProps {
    id: string;
    body: updateTaskBody;
}
export const patchTask = (props: IPatchTaskProps) => {
    const { id, body } = props;
    return backendApi.patch<updateTaskDTO>(`/admin/tasks/${id}`, body);
};

export const deleteTask = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deleteTaskDTO>(`/admin/tasks/${id}`);
};
