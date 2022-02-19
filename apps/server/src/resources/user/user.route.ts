import * as UserController from "../user/user.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";

const route = express.Router();

route.get(
    "/admin/users",
    verifyToken,
    authorization(["ADMIN"]),
    UserController.getPaginationUsers
);

route.get(
    "/admin/users/:id",
    verifyToken,
    authorization(["ADMIN"]),
    UserController.getUserDetails
);

export default route;
