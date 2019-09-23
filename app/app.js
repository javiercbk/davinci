const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const addRequestId = require('express-request-id');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const csrf = require('csurf');

const {
  DAVINCI_AUTH_COOKIE,
  DAVINCI_SECRET,
} = require('./lib/config');
const RestError = require('./lib/error');
const logger = require('./lib/log/logger');
const logMiddleware = require('./lib/log/middleware');
const sendResponseMiddleware = require('./lib/response/middleware');
const errorMiddleware = require('./lib/error/middleware');
const {
  userAbilitiesMiddleware
} = require('./lib/user-abilities');
const csrfMiddleware = require('./lib/csrf/middleware');
const mongoConnection = require('./lib/db');
const iframeDownload = require('./lib/iframe-download/middleware');

const authRouter = require('./api/auth/auth-router');
const versionRouter = require('./api/version/version-router');
const userRouter = require('./api/user/user-router');
const anthropometristRouter = require('./api/anthropometrist/anthropometrist-router');
const anthropometryRouter = require('./api/anthropometry/anthropometry-router');
const patientRouter = require('./api/patient/patient-router');
const sportRouter = require('./api/sport/sport-router');

// Creates and configures an ExpressJS web server.
class App {
  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  middleware() {
    const sessionConfiguration = {
      name: DAVINCI_AUTH_COOKIE,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      secret: DAVINCI_SECRET,
      store: new MongoStore({
        mongooseConnection: mongoConnection.mongoose.connection,
        ttl: 1 * 60 * 60, // = 1 hour
      }),
    };
    this.express.use(iframeDownload);
    this.express.use(addRequestId());
    this.express.use(session(sessionConfiguration));
    this.express.use(userAbilitiesMiddleware);
    this.express.use(logMiddleware());
    this.express.use(helmet());
    this.express.use(sendResponseMiddleware);
    this.express.use(cookieParser());
    // csrf configuration
    this.express.use(csrf());
    // csrf error handler
    this.express.use(csrfMiddleware);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({
      extended: true
    }));
  }

  // Configure API endpoints.
  routes() {
    // endpoints go here
    logger.debug('auth');
    this.express.use('/api/auth', authRouter);
    logger.debug('version');
    this.express.use('/api/version', versionRouter);
    logger.debug('user');
    this.express.use('/api/user', userRouter);
    logger.debug('anthropometrist');
    this.express.use('/api/anthropometrist', anthropometristRouter);
    logger.debug('anthropometry');
    this.express.use('/api/anthropometry', anthropometryRouter);
    logger.debug('patient');
    this.express.use('/api/patient', patientRouter);
    logger.debug('sport');
    this.express.use('/api/sport', sportRouter);

    this.express.use((req, res, next) => {
      const err = new RestError(404, {
        message: 'Resource not found'
      });
      err.status = 404;
      next(err);
    });

    this.express.use(errorMiddleware);
  }
}

module.exports = App;
