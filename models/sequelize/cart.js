import sequelize from 'sequelize';
import db from '../../databases/dbSequelize.js';

const Cart = db.define(
  'cart',
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

export default Cart;
