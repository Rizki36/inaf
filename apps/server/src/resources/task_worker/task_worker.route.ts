import * as TaskController from "./task_worker.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createTaskWorkerSchema,
    deleteTaskWorkerSchema,
    taskWorkerByTaskIdSchema,
    updateTaskWorkerSchema,
} from "./task_worker.validation";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

/** pagination task workers */
// TODO : Remove cause it's not used
route.get(
    "/admin/task-workers",
    verifyToken,
    authorization(["ADMIN"]),
    TaskController.taskWorkerPagination
);

/** create task worker */
route.post(
    "/admin/task-workers",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createTaskWorkerSchema),
    TaskController.createTaskWorker
);

/** update task worker */
// TODO : Remove cause it's not used
route.patch(
    "/admin/task-workers/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updateTaskWorkerSchema),
    TaskController.updateTaskWorker
);

/** delete task worker */
route.delete(
    "/admin/task-workers/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(deleteTaskWorkerSchema),
    TaskController.deleteTaskWorker
);

/** task workers by taskId */
route.get(
    "/admin/task-workers/tasks/:taskId",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(taskWorkerByTaskIdSchema),
    TaskController.taskWorkerByTaskId
);

export default route;
