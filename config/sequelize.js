import {Sequelize} from "sequelize";
require('dotenv').config();

const maindb = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    timezone: '+06:00',
    sync: ({force: true})
});

export default maindb;