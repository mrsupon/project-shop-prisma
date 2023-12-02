import 'dotenv/config';
import Sequelize from 'sequelize';

// const dbSequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   dialect: 'mysql',
//   host: process.env.DB_HOST,
//   logging: false,
// });

class DbSequelize {
  static db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    logging: false,
  });
  static async connect(option = '') {
    //alter, force
    return await DbSequelize.db.sync(option);
  }
}

export default DbSequelize;

// DbSequelize.connect() // {force:true} or {alter:true}
//   .then((result) => {
//     app.listen(port, () => {
//       console.log(`Successfully started server on port ${port}.`);
//     });
//   })
// .catch(err => {
//   console.log(err);
//   res.redirect("/500");
// });
