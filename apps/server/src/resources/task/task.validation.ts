import * as yup from "yup";
import { createTaskBody, updateTaskBody } from "./task.dto";

export const createTaskSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createTaskBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
        attachment: yup.object().required(),
        beginAt: yup.date().nullable(),
        finishAt: yup.date().nullable(),
        projectId: yup.string().nullable(),
        taskGroupId: yup.string().nullable(),
    }),
});

export const updateTaskSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updateTaskBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
        attachment: yup.object().required(),
        beginAt: yup.date().nullable(),
        finishAt: yup.date().nullable(),
        projectId: yup.string().nullable(),
        taskGroupId: yup.string().nullable(),
    }),
});
