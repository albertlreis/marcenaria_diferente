import { DataTypes } from 'sequelize';
import db from './db.js';
import TransactionType from "./TransactionType.js";

const Transaction = db.define('transaction', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seller: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    schema: 'public'
});

Transaction.belongsTo(TransactionType, { foreignKey: 'type' });


export default Transaction;
