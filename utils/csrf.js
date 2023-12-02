import CSRF from 'csrf';
const token = new CSRF();
const csrf = function csrf(options) {
  options = options || {};
  var safe = options.unsafe === undefined ? true : !options.unsafe;

  return function (req, res, next) {
    if (req.csrf && safe) {
      return next();
    }
    req.csrf = _csrf;
    next();
  };
};

function _csrf(args) {
  if (this.session === undefined) throw Error('req.csrf() requires sessions');

  let objResult = (this.session.csrf = this.session.csrf || {});

  if ((typeof args === 'string' || args instanceof String) && args === 'verify') {
    const tokenInput = this.body.csrfInput;
    const secret = this.session.csrf.secret;
    this.session.csrf = { secret: '', token: '' };
    return token.verify(secret, tokenInput);
  } else {
    let csrfSecret = '';
    let csrfToken = '';
    csrfSecret = token.secretSync();
    csrfToken = token.create(csrfSecret);
    objResult = { secret: csrfSecret, token: csrfToken };
    this.session.csrf = objResult;
    return "<input type='hidden' name='csrfInput' value='" + csrfToken + "'>";
  }
}

export default csrf;
