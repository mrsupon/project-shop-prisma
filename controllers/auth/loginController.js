import User from '../../models/mongoose/user.js';
import bcrypt from 'bcryptjs';
import OldInputMiddleware from '../../middlewares/oldInputMiddleware.js';
import ValidatorMiddleware from '../../middlewares/validatorMiddleware.js';
import AuthMiddleware from '../../middlewares/authMiddleware.js';
import prisma from '../../database/prisma/dbPrismaMysql.js';
import Utility from '../../utils/utility.js';

class LoginController {
  static index(req, res) {}

  static create(req, res) {
    res.render('auth/login.ejs', {
      csrf: req.csrf(), //return token string
      old: req.oldInput(), //return object
      auth: req.session.auth,
      products: null,
      pageTitle: 'Login',
      path: '/auth/login/create',
      errorFields: req.validateInput('fields'), //return array
      errorMessages: req.validateInput('messages'), //return array
      messages: req.flash(), //return object of array
    });
  }

  static store = async (req, res) => {
    try {
      const isValidToken = req.csrf('verify');
      if (!isValidToken) {
        throw new Error('invalid csrf token!');
      }

      const email = req.body.email.trim().toLowerCase();
      const password = req.body.password.trim();

      const errors = req.validateInput('verify');
      //const errors = Utility.getValidateErrors(req);
      if (errors) {
        req.flash('errorMessages', errors.messages);
        req.oldInput(req.body);
        //req.session.oldInput = { ...req.body };
        return res.status(422).redirect('/auth/login/create');
      }
      const user = await prisma.users.findUnique({ where: { email: email } });
      const doMatch = await bcrypt.compare(password, user.password);

      if (doMatch) {
        //AuthMiddleware.isAuth({ id: user.id, name: user.name });
        req.flash('success', 'Login succesfully');
        req.session.auth = { id: user.id, name: user.name };
        req.session.save(function (err) {
          if (err) throw err;
          else res.redirect('/'); // redirect session don't auto save && save have to use callback
        });
      } else {
        req.session.auth = null;
        req.flash('errorMessages', 'Password is wrong');
        req.flash('errorFields', 'password');
        req.oldInput(req.body);
        res.redirect('/auth/login/create');
      }
    } catch (err) {
      console.log(err);
      req.flah();
      res.redirect('/500');
      //return res.render('500.ejs', { auth: req.session.auth, pageTitle: 'Error', path: '/500' });
    }
  };

  static edit(req, res) {}

  static update(req, res) {}

  static destroy(req, res) {
    req.session.destroy();
    res.redirect('/');
    //Utility.resetSession(req, res);
    //AuthMiddleware.clearAuth();
  }
}

export default LoginController;
