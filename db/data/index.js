const development = require('./development-data');
const test = require('./test-data');

const ENV = process.env.NODE_ENV || 'development';

const data = {
  development,
  test,
  production: development,
};

module.exports = data[ENV];
