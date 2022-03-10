import * as AuthController from '../auth/auth.controller'
import express from 'express';
import verifyToken from '../../middleware/verifToken';
import { authorization } from '../../middleware/authorization';
import validate from '../../middleware/validation';
import { signupSchema, signinSchema } from './auth.validation';

const route = express.Router();

route.post('/signup', validate(signupSchema), AuthController.signup)
    .post('/signin', validate(signinSchema), AuthController.signin)
    .get('/account', verifyToken, authorization(['USER','ADMIN']), AuthController.account)
    .post('/logout', verifyToken, AuthController.logout)

export default route;