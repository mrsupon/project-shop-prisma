const oldInput = function oldInput(options) {
  options = options || {};
  var safe = options.unsafe === undefined ? true : !options.unsafe;

  return function (req, res, next) {
    if (req.oldInput && safe) {
      return next();
    }
    req.oldInput = _oldInput;
    next();
  };
};

function _oldInput(objParam) {
  if (this.session === undefined) throw Error('req.oldInput() requires sessions');
  let objResult = (this.session.oldInput = this.session.oldInput || {});

  if (objParam) {
    // util.format is available in Node.js 0.6+
    if (typeof objParam === 'object' && objParam !== null && !Array.isArray(objParam)) {
      objResult = { ...objParam };
      this.session.oldInput = objResult;
    } else {
      objResult = {};
    }
    this.session.oldInput = objResult;
    return objResult;
  } else {
    const obj = { ...objResult };
    this.session.oldInput = {};
    return obj;
  }
}

export default oldInput;
