const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URL = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const options = {
  dialect: 'mysql',
  logging: config.isProd ? false : console.log,
};

if(config.isProd){
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

const sequelize = new Sequelize(URL, options);

setupModels(sequelize);

/* sequelize.sync(); */

module.exports = sequelize;
