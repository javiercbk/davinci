#!/usr/bin/env node

const Promise = require('bluebird');
const db = require('./lib/db');
const App = require('./app');
const logger = require('./lib/log/logger');
const config = require('./lib/config');

let server = null;

process.on('uncaughtException', (err) => {
  const message = err.message || err;
  logger.error(`Uncaught error: ${message}`);
});

let app;

process.on('SIGINT', () => {
  // Graceful shutdown
  // wait 2 seconds and close the db and exit
  if (server) {
    server.close();
  }
  if (db) {
    setTimeout(() => {
      db.close()
        .catch((err) => {
          const message = err.message || err;
          logger.error(`Error closing db connection: ${message}`);
        })
        .finally(() => {
          process.exit(0);
        });
    }, 1000);
  }
});

const attemptConnection = attempt => db.connect(config).catch((err) => {
  logger.error(`env vars: ${JSON.stringify(config)}`, err);
  let currentAttempt = attempt || 0;
  if (currentAttempt <= 3) {
    currentAttempt++;
    logger.warn(
      `Could not connect to mongo, retrying to connect in 3 seconds. Attempt: ${currentAttempt}`
    );
    return Promise.delay(3000).then(() => attemptConnection(currentAttempt));
  }
  logger.error('Failed to connect to mongo. Error:\n', err);
  process.exit(-1);
});

attemptConnection().then(() => {
  app = new App();
  logger.info(`Given port is ${config.DAVINCI_PORT}`);
  app.express.set('port', config.DAVINCI_PORT);
  const port = app.express.get('port');
  logger.info(`Express will start listening on port ${port}`);
  server = app.express.listen(port, () => {
    logger.info('Express server listening');
  });
});
