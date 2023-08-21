import {DataTypes} from 'sequelize';
import db from './db.js';

const User = db.define('user', {
    username: {
        type: DataTypes.STRING(1),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    schema: 'public' // Define o esquema da tabela
});

export default User;
