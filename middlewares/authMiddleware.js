class AuthMiddleware {
  static isAuth(authParam) {}

  static clearAuth() {}

  static verify(req, res, next) {
    res.locals.auth = null;
    if (req.session.auth) {
      res.locals.auth = req.session.auth;
    }

    next();
  }

  static isAuthGoDashboard(req, res, next) {
    // if () {
    //   return res.redirect(route.dashboard);
    // }
  }

  static isNotAuthGoLogin(req, res, next) {
    // if () {
    //   next();
    // }
    // res.redirect(route.login);
  }
}

export default AuthMiddleware;
