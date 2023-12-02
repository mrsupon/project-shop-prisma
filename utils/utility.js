import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';

class Utility {
  static getUID() {
    return Date.now().toString() + (100 + Math.floor(Math.random() * 100)).toString().substring(-3);
  }

  static currencyFormat(number) {
    const fixedNumber = Number.parseFloat(number).toFixed(2);
    return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static getPath(location) {
    return path.join(process.cwd(), location);
  }

  static validate(schema, req) {
    try {
      schema.parse({
        data: req,
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return null;
    } catch (err) {
      //console.log(err);
      let messages = [];
      if (err.errors.length > 0) messages = err.errors.map((error) => error.message);

      let paths = [];
      if (err.errors.length > 0) paths = err.errors.map((error) => error.path[error.path.length - 1]);

      return { errorMessages: messages.sort(), errorFields: paths };
    }
  }

  static getValidateErrors(req) {
    const errors = validationResult(req); //{messages:[], fields:[]}

    if (!errors.isEmpty()) {
      let messageArr = errors.array().map((error) => error.msg);
      let fieldArr = errors.array().map((error) => error.path);
      return { messages: messageArr, fields: fieldArr };
    } else {
      return null;
    }
  }

  static prompt(msg) {
    fs.writeSync(1, String(msg));
    let s = '',
      buf = Buffer.alloc(1);
    while (buf[0] - 10 && buf[0] - 13) (s += buf), fs.readSync(0, buf, 0, 1, 0);
    return s.slice(1);
  }
  static print(msg) {
    console.log(msg);
  }
  static printAt(position, msg) {
    let space = '';
    for (let i = 1; i < position; i++) space += ' ';
    console.log(space + msg);
  }
  static printArrayAt(position, arr) {
    let result = '';
    for (let i = 1; i < position; i++) result += ' ';
    arr.forEach((value) => (result += value));
    console.log(result);
  }

  static deleteFile(filePath) {
    if (fs.existsSync(Utility.getPath(filePath))) {
      fs.unlink(Utility.getPath(filePath), (err) => {
        console.log(Utility.getPath(filePath));
        if (err) throw err;
        else return true;
      });
    }
  }

  static resetSession(req, res) {
    req.session.auth = null;
    req.flash = null;
    req.session.save();
  }

  static apiCatch(error, res) {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  }
  static webCatch(error, res) {
    const status = error.statusCode || 500;
    res.status(status).redirect('/500');
  }

  static getDateTimeMysqlFormat() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  static getEjsData() {
    const obj = {
      auth: {},
      old: {},
      data: [],
      pageTitle: 'Home',
      path: '/',
      errorFields: [], //return array
      errorMessages: [], //return array
      messages: {},
      pagination: null,
    };
    return Object.create(obj);
  }
}

const $ = Utility.currencyFormat;
const prompt = Utility.prompt;
const print = Utility.print;
const printAt = Utility.printAt;
const printArrayAt = Utility.printArrayAt;

export default Utility;
export { $, prompt, print, printAt, printArrayAt };
