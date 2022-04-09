import * as yup from "yup";
import { createTaskGroupBody, updateTaskGroupBody } from "./task_group.dto";

export const createTaskGroupSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createTaskGroupBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
        attachment: yup.object().required(),
        projectId: yup.string().nullable(),
    }),
});

export const updateTaskGroupSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updateTaskGroupBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
        attachment: yup.object().required(),
        projectId: yup.string().nullable(),
    }),
});

export const deleteTaskGroupSchema = yup.object<Record<string, any>>({
    params: yup.object<Record<string, any>>({
        id: yup.string().required(),
    }),
});
