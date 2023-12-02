/**
 * Module dependencies.
 */
//var format = require('util').format;
//var isArray = require('util').isArray;
import Util from 'util';

var format = Util.format();

/**
 * Expose `flash()` function on requests.
 *
 * @return {Function}
 * @api public
 */
const flashMessage = function flash(options) {
  options = options || {};
  var safe = options.unsafe === undefined ? true : !options.unsafe;

  return function (req, res, next) {
    if (req.flash && safe) {
      return next();
    }
    req.flash = _flash;
    next();
  };
};

/**
 * Queue flash `msg` of the given `type`.
 *
 * Examples:
 *
 *      req.flash('info', 'email sent');
 *      req.flash('error', 'email delivery failed');
 *      req.flash('info', 'email re-sent');
 *      // => 2
 *
 *      req.flash('info');
 *      // => ['email sent', 'email re-sent']
 *
 *      req.flash('info');
 *      // => []
 *
 *      req.flash();
 *      // => { error: ['email delivery failed'], info: [] }
 *
 * Formatting:
 *
 * Flash notifications also support arbitrary formatting support.
 * For example you may pass variable arguments to `req.flash()`
 * and use the %s specifier to be replaced by the associated argument:
 *
 *     req.flash('info', 'email has been sent to %s.', userName);
 *
 * Formatting uses `util.format()`, which is available on Node 0.6+.
 *
 * @param {String} type
 * @param {String} msg
 * @return {Array|Object|Number}
 * @api public
 */
function _flash(type, msg) {
  if (this.session === undefined) throw Error('req.flash() requires sessions');
  var msgs = (this.session.flash = this.session.flash || {});
  if (type && msg) {
    // util.format is available in Node.js 0.6+
    if (arguments.length > 2 && format) {
      var args = Array.prototype.slice.call(arguments, 1);
      msg = format.apply(undefined, args);
    } else if (Array.isArray(msg)) {
      msg.forEach(function (val) {
        (msgs[type] = msgs[type] || []).push(val);
      });
      return msgs[type].length;
    }
    return (msgs[type] = msgs[type] || []).push(msg);
  } else if (type) {
    var arr = msgs[type];
    delete msgs[type];
    return arr || [];
  } else {
    this.session.flash = {};
    return msgs;
  }
}

export default flashMessage;
// class Message {
//   static _instance = null;

//   constructor() {
//     this.data = {};

//     if (!Message._instance) {
//       Message._instance = this;
//     }
//     return Message._instance;
//   }

//   getInstance() {
//     return this._instance;
//   }
//   set(key = '', val) {
//     if (key) {
//       if (Array.isArray(val)) {
//         this.data[key] = [...(this.data[key] || [])].concat(val);
//       } else if (typeof val === 'string' || val instanceof String) {
//         this.data[key] = [...(this.data[key] || []), val];
//       }
//     }
//   }
//   get(key) {
//     if (typeof key === 'string' || key instanceof String) {
//       const arr = [...(this.data[key] || [])];
//       delete this.data[key];
//       return arr;
//     } else if (key === undefined) {
//       const obj = { ...this.data };
//       this.data = {};
//       return obj;
//     }
//     return null;
//   }
//   isEmpty() {
//     return Object.keys(this.data).length === 0;
//   }
// }

// const message = new Message();
// export default message;
