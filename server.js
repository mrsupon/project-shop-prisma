import express from 'express';
import Route from './routes/web.js';
import MiddlewareRegister from './middlewares/middlewareRegister.js';
import AuthMiddleware from './middlewares/authMiddleware.js';
import DbMongoose from './database/dbMongoose.js';
import Utility from './utils/utility.js';
import morgan from 'morgan';

const app = express();
const port = 3000;

MiddlewareRegister.init(app);
Route.init(app);
app.use((err, req, res, next) => {
  console.log(err);
  // AuthMiddleware.clearAuth();
  //Utility.resetSession(req, res);
  res.status(500).redirect('/500');
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

// DbMongoose.connect()
//   .then((result) => {
//     app.listen(port, () => {
//       console.log(`Successfully started server on port ${port}.`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//     res.redirect('/500');
//   });
