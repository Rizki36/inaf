import backendApi from "configs/api/backendApi";
import {
    createTaskWorkerBody,
    createTaskWorkerDTO,
    deleteTaskWorkerDTO,
} from "server";

interface ICreateTaskWorkerProps {
    body: createTaskWorkerBody;
}
export const createTaskWorker = (props: ICreateTaskWorkerProps) => {
    const { body } = props;
    return backendApi.post<createTaskWorkerDTO>(`/admin/task-workers`, body);
};

export const deleteTaskWorker = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deleteTaskWorkerDTO>(`/admin/task-workers/${id}`);
};
