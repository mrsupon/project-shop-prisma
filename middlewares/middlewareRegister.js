import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import session from 'express-session';
//import { default as connectMongodbSession } from 'connect-mongodb-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
//import { PrismaClient } from '@prisma/client';
import prismaSqlite from '../databases/prismaSqlite/dbPrismaSqlite.js';

import DbMongoose from '../databases/dbMongoose.js';
import SanitizerMiddleware from './sanitizerMiddleware.js';
//import flash from 'connect-flash';
import multer from 'multer';
import morgan from 'morgan';
import flash from '../utils/flashMessage.js';
import oldInput from '../utils/oldInput.js';
import csrf from '../utils/csrf.js';
import validateInput from '../utils/validation.js';

class MiddlewareRegister {
  static init(app) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    ///////////// connect-mongodb-session ////////////////////
    // const MongodbStore = connectMongodbSession(session);
    // const mongodbStore = new MongodbStore({
    //   uri: DbMongoose.connectionString,
    //   collection: 'session',
    // });
    ///////////// prisma-session-store ////////////////////
    const expire = {
      maxAge: 1 * 24 * 60 * 60 * 1000, // ms
    };
    const prismaStore = new PrismaSessionStore(prismaSqlite, {
      checkPeriod: 1 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    });

    const fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/assets/backEnd/images/upload/products');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });
    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    //app.use(morgan('tiny'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('node_modules'));
    app.use(express.static('public'));
    //app.use(express.static(__dirname)); //serving public file
    app.use(methodOverride('_method'));
    app.use(SanitizerMiddleware.sanitizeReqBody);
    app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
    //app.use("/public", express.static("public/assets/backEnd/images/upload/products"));
    //app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: mongodbStore }));

    app.use(
      session({ cookie: expire, secret: 'my secret', resave: false, saveUninitialized: false, store: prismaStore }) // store: prismaStore
    );
    app.use(flash());
    app.use(oldInput());
    app.use(csrf());
    app.use(validateInput());

    //app.use(OldInputMiddleware.set());
    //app.use(AuthMiddleware.verify());
  }
}

export default MiddlewareRegister;
