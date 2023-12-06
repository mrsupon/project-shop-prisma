import sequelize from 'sequelize';
import db from '../../databases/dbSequelize.js';

const CartItem = db.define(
  'cartItem',
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

export default CartItem;
