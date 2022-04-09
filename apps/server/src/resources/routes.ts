import express from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./user/user.route";
import positionRoute from "./position/position.route";
import projectRoute from "./project/project.route";
import teamRoute from "./team/team.route";
import taskRoute from "./task/task.route";
const route = express.Router();

route.use([
    authRoute,
    userRoute,
    positionRoute,
    projectRoute,
    teamRoute,
    taskRoute,
]);

export default route;
