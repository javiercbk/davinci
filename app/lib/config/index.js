const getenv = require('getenv');

let configuration;

const NODE_ENV = getenv('NODE_ENV', 'development');

if (NODE_ENV === 'test') {
  configuration = {
    NODE_ENV,
    DAVINCI_PORT: 0,
    DAVINCI_SECRET: 'davinci_test_secret',
    DAVINCI_VERSION: 'unit-test',
    DAVINCI_AUTH_COOKIE: 'dvauth',
    DAVINCI_RECAPTCHA_SECRET: '',
    DAVINCI_USE_SECURE_COOKIES: false,
    DAVINCI_DB_USERNAME: '',
    DAVINCI_DB_PASSWORD: '',
    DAVINCI_DB_NAME: '',
    DAVINCI_DB_URL: '',
  };
} else {
  configuration = {
    NODE_ENV,
    DAVINCI_PORT: getenv.int('DAVINCI_PORT', 3443),
    DAVINCI_SECRET: getenv('DAVINCI_SECRET'),
    DAVINCI_VERSION: getenv('DAVINCI_VERSION', 'unknown'),
    DAVINCI_AUTH_COOKIE: getenv('DAVINCI_AUTH_COOKIE', 'dvauth'),
    DAVINCI_RECAPTCHA_SECRET: getenv('DAVINCI_RECAPTCHA_SECRET'),
    DAVINCI_USE_SECURE_COOKIES: getenv.bool('DAVINCI_USE_SECURE_COOKIES', false),
    DAVINCI_DB_USERNAME: getenv('DAVINCI_DB_USERNAME'),
    DAVINCI_DB_PASSWORD: getenv('DAVINCI_DB_PASSWORD', null),
    DAVINCI_DB_NAME: getenv('DAVINCI_DB_NAME'),
    DAVINCI_DB_URL: getenv('DAVINCI_DB_URL')
  };
}

module.exports = configuration;
