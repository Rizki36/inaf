import { NextFunction, Request, Response } from "express";
import {
    getTeamsByProjectService,
    createTeamService,
    updateTeamService,
    deleteTeamService,
} from "./team.service";

import {
    createTeamBody,
    deleteTeamParams,
    updateTeamBody,
    updateTeamParams,
} from "./team.dto";
import { createdResponse, successResponse } from "../../helpers/methods";

/** get teams by project based on projectId */
export const getTeamsByProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { projectId } = req.params;

        const data = await getTeamsByProjectService(projectId);

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** create team */
export const createTeam = async (
    req: Request<{}, {}, createTeamBody>,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { userId, positionId, projectId } = req.body;

        const team = await createTeamService({
            body: {
                positionId,
                projectId,
                userId,
            },
        });

        res.send(createdResponse(team));
    } catch (error) {
        next(error);
    }
};

/** update team based on projectId and userId */
export const updateTeam = async (
    req: Request<updateTeamParams, {}, updateTeamBody>,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { positionId } = req.body;
        const { projectId, userId } = req.params;

        const data = await updateTeamService({
            body: {
                positionId,
            },
            params: {
                projectId,
                userId,
            },
        });

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** delete team based on projectId and userId */
export const deleteTeam = async (
    req: Request<deleteTeamParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { projectId, userId } = req.params;

        const data = await deleteTeamService({
            projectId,
            userId,
        });

        return res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
};
