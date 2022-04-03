import * as TeamController from "./team.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createTeamSchema,
    deleteTeamSchema,
    getTeamsByProjectSchema,
    updateTeamSchema,
} from "./team.validation";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

/** get teams by project */
route.get(
    "/admin/teams/projects/:projectId/users",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(getTeamsByProjectSchema),
    TeamController.getTeamsByProject
);

/** create team */
route.post(
    "/admin/teams",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createTeamSchema),
    TeamController.createTeam
);

/** update team */
route.patch(
    "/admin/teams/projects/:projectId/users/:userId",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updateTeamSchema),
    TeamController.updateTeam
);

/** delete team */
route.delete(
    "/admin/teams/projects/:projectId/users/:userId",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(deleteTeamSchema),
    TeamController.deleteTeam
);

export default route;
