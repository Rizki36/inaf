import express from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./user/user.route";
import positionRoute from "./position/position.route";
import projectRoute from "./project/project.route";
import teamRoute from "./team/team.route";
import taskRoute from "./task/task.route";
import taskGroupRoute from "./task_group/task_group.route";
import taskWorkerRoute from "./task_worker/task_worker.route";

const route = express.Router();

route.use([
    authRoute,
    userRoute,
    positionRoute,
    projectRoute,
    teamRoute,
    taskRoute,
    taskGroupRoute,
    taskWorkerRoute,
]);

export default route;
