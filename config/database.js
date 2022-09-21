import dotenv from 'dotenv';
dotenv.config();

const database = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
}

module.exports = database
