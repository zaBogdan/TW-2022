const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV || 'dev';

const config = dotenv.config({
  path: `./configs/${ENV}.env`,
}).parsed;

module.exports = {
    config,
};