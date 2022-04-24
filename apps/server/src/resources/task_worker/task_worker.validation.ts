import * as yup from "yup";
import { createTaskWorkerBody, updateTaskWorkerBody } from "./task_worker.dto";

export const createTaskWorkerSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createTaskWorkerBody, any>>({
        userId: yup.string().required(),
        taskId: yup.string().required(),
    }),
});

export const updateTaskWorkerSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updateTaskWorkerBody, any>>({
        userId: yup.string().required(),
        taskId: yup.string().required(),
    }),
});

export const deleteTaskWorkerSchema = yup.object<Record<string, any>>({
    params: yup.object<Record<string, any>>({
        id: yup.string().required(),
    }),
});

export const taskWorkerByTaskIdSchema = yup.object<Record<string, any>>({
    params: yup.object<Record<string, any>>({
        taskId: yup.string().required(),
    }),
});
