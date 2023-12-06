import createError from 'http-errors';
import ShopController from '../controllers/shops/shopController.js';
import AuthRouter from './web/auth.js';
import AdminRouter from './web/admin.js';
import ShopRouter from './web/shop.js';

class Web {
  static init(app) {
    app.get('/', ShopController.index);
    app.use('/auth', AuthRouter);
    app.use('/admins', AdminRouter);
    app.use('/shops', ShopRouter);

    // catch 404 and forward to error handler
    app.use('/*', function (req, res, next) {
      //next(createError(404));  //(new createError.NotFound('Page not found.'))
      next(createError.NotFound());
      //next();
    });
  }
}

export default Web;
