import { Team } from "@prisma/client";
import { AsyncReturnType } from "../../../@types";
import {
    deleteTeamService,
    createTeamService,
    getTeamsByProjectService,
} from "./team.service";

/** get teams by project */
export type getTeamsByProjectParams = Pick<Team, "projectId">;
export type getTeamsByProjectDTO = AsyncReturnType<
    typeof getTeamsByProjectService
>;

/** create team */
export type createTeamBody = Pick<Team, "projectId" | "positionId" | "userId">;
export type createTeamDTO = AsyncReturnType<typeof createTeamService>;

/** update team */
export type updateTeamParams = Pick<Team, "projectId" | "userId">;
export type updateTeamBody = Pick<Team, "positionId">;

/** delete team */
export type deleteTeamParams = Pick<Team, "projectId" | "userId">;
export type deleteTeamDTO = AsyncReturnType<typeof deleteTeamService>;
