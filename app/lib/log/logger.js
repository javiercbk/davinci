const bunyan = require('bunyan');
const {
  LoggingBunyan
} = require('@google-cloud/logging-bunyan');

const {
  NODE_ENV
} = require('../config');

// Creates a Bunyan Stackdriver Logging client

const streams = [];

if (NODE_ENV === 'production') {
  const loggingBunyan = new LoggingBunyan();
  streams.push(loggingBunyan.stream('info'));
} else {
  streams.push({
    stream: process.stdout,
    level: 'info'
  });
}

// Create a Bunyan logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "my-service"
  name: 'davinci',
  streams,
});

module.exports = logger;
