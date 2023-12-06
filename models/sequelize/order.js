import sequelize from 'sequelize';
import db from '../../databases/dbSequelize.js';

const Order = db.define(
  'order',
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    //updatedAt:false
  }
);

export default Order;
