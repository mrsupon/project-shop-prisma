import { validationResult, checkSchema, body, check } from 'express-validator';
import prisma from '../database/prisma/dbPrismaMysql.js';

class ValidatorMiddleware {
  //static errors = null;
  constructor() {}

  setSessionErrors(req, res, next) {
    const errors = validationResult(req); //{messages:[], fields:[]}

    if (!errors.isEmpty()) {
      let messageArr = errors.array().map((error) => error.msg);
      let fieldArr = errors.array().map((error) => error.path);
      req.session.validationErrors = { messages: messageArr, fields: fieldArr };
    } else {
      req.session.validationErrors = null;
    }

    next();
  }
  static signup = [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email /n is not valid')
      .custom(async (value) => {
        const user = await prisma.users.findUnique({
          where: {
            email: value,
          },
        });
        if (user) throw new Error('Email /n already in use');
      }),

    body('password').trim().isLength({ min: 4 }).withMessage('Password /n should be at least 4 characters'),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage('Confirm password /n is not match!'),
    //this.setSessionErrors,
  ];
  static login = [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email /n is not valid')
      .custom(async (value) => {
        const user = await prisma.users.findUnique({
          where: {
            email: value,
          },
        });
        if (!user) throw new Error('Email /n is wrong');
      }),
    body('password').trim().isLength({ min: 4 }).withMessage('Password /n should be at least 4 characters'),
    //this.setSessionErrors,
  ];

  static example = [
    checkSchema({
      userName: {
        exists: {
          errorMessage: 'User name is required',
          options: { checkFalsy: true },
        },
        isString: { errorMessage: 'User name should be string' },
      },
      password: {
        exists: { errorMessage: 'Password is required' },
        isString: { errorMessage: 'password should be string' },
        isLength: {
          options: { min: 5 },
          errorMessage: 'Password should be at least 5 characters',
        },
      },
      email: {
        isEmail: { errorMessage: 'Please provide valid email' },
      },
      gender: {
        isString: { errorMessage: 'Gender should be string' },
        isIn: {
          options: [['Male', 'Female', 'Other']],
          errorMessage: 'Gender is invalid',
        },
      },
      dateOfBirth: {
        isDate: { errorMessage: 'DOB should be string' },
      },
      phoneNumber: {
        isString: { errorMessage: 'phone number should be string' },
        custom: (value) => {
          if (value.length !== 10) {
            return Promise.reject('Phone number should be 10 digits');
          } else {
            return true;
          }
        },
        errorMessage: 'Phone number should be 10 digits',
      },
    }),
    //this.setSessionErrors,
  ];
}

export default ValidatorMiddleware;
