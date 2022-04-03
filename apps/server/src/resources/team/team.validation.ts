import { Request } from "express";
import * as yup from "yup";
import {
    createTeamBody,
    deleteTeamParams,
    getTeamsByProjectParams,
    updateTeamBody,
    updateTeamParams,
} from "./team.dto";

/** get teams by project schema */
export const getTeamsByProjectSchema = yup.object<
    Partial<Record<keyof Request, any>>
>({
    params: yup.object<Record<keyof getTeamsByProjectParams, any>>({
        projectId: yup.string(),
    }),
});

/** create team schema */
export const createTeamSchema = yup.object<Partial<Record<keyof Request, any>>>(
    {
        body: yup.object<Record<keyof createTeamBody, any>>({
            positionId: yup.string().required(),
            projectId: yup.string().required(),
            userId: yup.string().required(),
        }),
    }
);

/** update team schema */
export const updateTeamSchema = yup.object<Partial<Record<keyof Request, any>>>(
    {
        params: yup.object<Record<keyof updateTeamParams, any>>({
            userId: yup.string().required(),
            projectId: yup.string().required(),
        }),
        body: yup.object<Record<keyof updateTeamBody, any>>({
            positionId: yup.string().required(),
        }),
    }
);

/** delete team schema */
export const deleteTeamSchema = yup.object<Partial<Record<keyof Request, any>>>(
    {
        params: yup.object<Record<keyof deleteTeamParams, any>>({
            userId: yup.string().required(),
            projectId: yup.string().required(),
        }),
    }
);
