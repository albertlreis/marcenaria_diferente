import { DataTypes } from 'sequelize';
import db from './db.js';

const TransactionType = db.define('transaction_type', {
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nature: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    signal: {
        type: DataTypes.STRING(1),
        allowNull: false,
    },
}, {
    schema: 'public'
});

export default TransactionType;
