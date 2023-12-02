import { validationResult } from 'express-validator';

const validateInput = function validateInput(options) {
  options = options || {};
  var safe = options.unsafe === undefined ? true : !options.unsafe;

  return function (req, res, next) {
    if (req.validateInput && safe) {
      return next();
    }
    req.validateInput = _validateInput;
    next();
  };
};

function _validateInput(args) {
  if (this.session === undefined) throw Error('req.validateInput() requires sessions');

  let messageArr = [];
  let fieldArr = [];
  let obj = (this.session.validateInput = this.session.validateInput || { messages: [], fields: [] });

  if (arguments.length === 0) {
    messageArr = [...obj.messages];
    fieldArr = [...obj.fields];
    obj = { messages: messageArr, fields: fieldArr };
    this.session.validateInput = { messages: [], fields: [] };
    return obj;
  } else if (arguments.length === 1 && (typeof args === 'string' || args instanceof String)) {
    if (args === 'verify') {
      const errors = validationResult(this);
      if (!errors.isEmpty()) {
        messageArr = errors.array().map((error) => error.msg);
        fieldArr = errors.array().map((error) => error.path);
        this.session.validateInput = { messages: [...new Set(messageArr)], fields: [...new Set(fieldArr)] }; // new Set() for unduplicate array
        return true;
      } else {
        return false;
      }
    } else if (args === 'messages') {
      messageArr = this.session.validateInput.messages;
      this.session.validateInput.messages = [];
      return messageArr;
    } else if (args === 'fields') {
      fieldArr = this.session.validateInput.fields;
      this.session.validateInput.fields = [];
      return fieldArr;
    } else {
      return [];
    }
  } else {
    return true;
  }
}

export default validateInput;
