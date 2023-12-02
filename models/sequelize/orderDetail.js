import sequelize from 'sequelize';
import db from '../../database/dbSequelize.js';

const OrderDetail = db.define(
  'orderDetail',
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: sequelize.INTEGER,
  },
  {
    //updatedAt:false
  }
);

export default OrderDetail;
