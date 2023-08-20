import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: 'marcenaria',
    username: 'postgres',
    password: 'senha',
    host: 'db', // Usar o nome do serviço do banco de dados definido no docker-compose.yml
    dialect: 'postgres',
});

export default sequelize;