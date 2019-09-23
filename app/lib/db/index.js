const mongoose = require('mongoose');
const Promise = require('bluebird');

const { accessibleRecordsPlugin, permittedFieldsPlugin } = require('@casl/mongoose');

mongoose.plugin(accessibleRecordsPlugin, permittedFieldsPlugin);

// setup schemas
require('./schemas');

const mongooseConnection = ({
  DAVINCI_DB_USERNAME,
  DAVINCI_DB_PASSWORD,
  DAVINCI_DB_NAME,
  DAVINCI_DB_URL
}) => new Promise((resolve, reject) => {
  // mongo atlas might throw an error with url with db name
  mongoose.connect(
    DAVINCI_DB_URL,
    {
      user: DAVINCI_DB_USERNAME,
      pass: DAVINCI_DB_PASSWORD,
      dbName: DAVINCI_DB_NAME,
      autoReconnect: true,
      promiseLibrary: Promise,
      poolSize: 5,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      reconnectTries: Number.MAX_VALUE
    },
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(mongoose);
      }
    }
  );
});

class MongoConnection {
  constructor() {
    this.mongoose = null;
  }

  /**
   * connect connects to mongodb
   * @returns {Promise} that resolves to the db object, otherwise it rejects with
   * an error
   */
  connect(configuration) {
    if (this.mongoose) {
      return Promise.resolve(this.mongoose);
    }
    return mongooseConnection(configuration).then((initializedMongoose) => {
      this.mongoose = initializedMongoose;
      return initializedMongoose;
    });
  }

  close() {
    if (this.mongoose) {
      return this.mongoose.disconnect().then(() => {
        this.mongoose = null;
      });
    }
    return Promise.resolve();
  }
}

const mongoConnection = new MongoConnection();

module.exports = mongoConnection;
