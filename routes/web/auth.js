import express from 'express';
import LoginController from '../../controllers/auth/loginController.js';
import SignupController from '../../controllers/auth/signupController.js';
import ResetPasswordController from '../../controllers/auth/resetPasswordController.js';

import validatorMiddleware from '../../middlewares/validatorMiddleware.js';

const AuthRouter = express.Router();

AuthRouter.get('/login/create', LoginController.create);
AuthRouter.post('/login', validatorMiddleware.login, LoginController.store);
AuthRouter.delete('/logout', LoginController.destroy);

AuthRouter.get('/signup/create', SignupController.create);
AuthRouter.post('/signup', validatorMiddleware.signup, SignupController.store);

AuthRouter.get('/resetPassword/create', ResetPasswordController.create);
AuthRouter.post('/resetPassword', ResetPasswordController.store);
AuthRouter.get('/resetPassword/:token/edit', ResetPasswordController.edit);
AuthRouter.put('/resetPassword/:token', ResetPasswordController.update);

export default AuthRouter;
