import express from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./user/user.route";
const route = express.Router();

route.use([authRoute, userRoute]);

export default route;
