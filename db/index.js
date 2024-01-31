"use strict";
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    ssl: true,
    dialectOptions: {
       ssl: {
          "require": true
       }
     }
  }
);

module.exports = {
  Sequelize: sequelize,
};
