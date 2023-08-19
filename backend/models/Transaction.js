import { DataTypes } from 'sequelize';
import db from './db.js';

const Transaction = db.define('transaction', {
    type: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
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
    schema: 'public' // Define o esquema da tabela
});

export default Transaction;
