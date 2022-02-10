import express from 'express';
import authRoute from './auth/auth.route'
const route = express.Router();

route.use(authRoute)

export default route