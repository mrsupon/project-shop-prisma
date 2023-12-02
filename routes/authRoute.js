import express from 'express';
import LoginController from '../controllers/auth/loginController.js';
import SignupController from '../controllers/auth/signupController.js';
import ResetPasswordController from '../controllers/auth/resetPasswordController.js';

import validatorMiddleware from '../middlewares/validatorMiddleware.js';

const AuthRoute = express.Router();

AuthRoute.get('/login/create', LoginController.create);
AuthRoute.post('/login', validatorMiddleware.login, LoginController.store);
AuthRoute.delete('/logout', LoginController.destroy);

AuthRoute.get('/signup/create', SignupController.create);
AuthRoute.post('/signup', validatorMiddleware.signup, SignupController.store);

AuthRoute.get('/resetPassword/create', ResetPasswordController.create);
AuthRoute.post('/resetPassword', ResetPasswordController.store);
AuthRoute.get('/resetPassword/:token/edit', ResetPasswordController.edit);
AuthRoute.put('/resetPassword/:token', ResetPasswordController.update);

export default AuthRoute;
