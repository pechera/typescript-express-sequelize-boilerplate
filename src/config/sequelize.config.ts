import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: String(DB_HOST),
    port: Number(DB_PORT),
    username: String(DB_USERNAME),
    password: String(DB_PASSWORD),
});

export default sequelize;
