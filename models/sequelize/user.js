import sequelize from 'sequelize';
import db from '../../database/dbSequelize.js';

const User = db.define(
  'user',
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: sequelize.STRING,
    email: sequelize.STRING,
  },
  {
    //updatedAt:false
  }
);

export default User;
