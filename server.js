import express from 'express';
import WebRouter from './routes/web.js';
import MiddlewareRegister from './middlewares/middlewareRegister.js';
import DbMongoose from './databases/dbMongoose.js';
import Utility from './utils/utility.js';
import morgan from 'morgan';

class App {
  static start() {
    const app = express();
    const port = 3000;

    MiddlewareRegister.init(app);
    WebRouter.init(app);

    app.use(App.handleError);

    app.listen(port, () => {
      console.log(`Successfully started server on port ${port}.`);
    });
  }
  static handleError(err, req, res, next) {
    res.status(err.status || 500).render('error.ejs', {
      auth: req.session.auth,
      pageTitle: err.status,
      path: '/error',
      errorMessages: req.app.get('env') === 'development' ? err : { message: err.message },
    });
  }
}

App.start();
