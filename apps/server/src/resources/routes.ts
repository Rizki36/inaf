import express from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./user/user.route";
import positionRoute from "./position/position.route";
const route = express.Router();

route.use([authRoute, userRoute, positionRoute]);

export default route;
