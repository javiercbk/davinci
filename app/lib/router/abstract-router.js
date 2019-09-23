const _ = require('lodash');
const express = require('express');
const {
  validationResult
} = require('express-validator/check');
const {
  matchedData
} = require('express-validator/filter');
const config = require('../config');
const RestError = require('../error');
const {
  pipeWithErrors
} = require('../streams');

const VALIDATION_ERRORS = 'Validation error';

/**
 * AbstractRouter implements common login for almost any route
 */
class AbstractRouter {
  /**
   * @param {Object} routerOptions - Express' router options
   */
  constructor(routerOptions) {
    this._expressRouter = express.Router(routerOptions);
  }

  get router() {
    return this._expressRouter;
  }

  /**
   * Executes a generic route logic by, validating the request, extracting all
   * the meaningful data into and object and calling a function with the
   * extracted data. Besides it handles validation errors and API calls errors.
   * @param {Object}    route - A route definition, accepts the following
   * @param {Function}  route.apiCall the function to execute.
   * @param {Function}  route.responseHandler a function that handles the response
   * (JSON response by default).
   * @return {Function} Express' middleware function
   */
  route(route) {
    const routeHandler = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RestError(400, {
          message: VALIDATION_ERRORS,
          validationErrors: errors.mapped()
        });
      }
      const reqObj = matchedData(req);
      route
        .apiCall(reqObj, {
          user: _.get(req, 'session.user'),
          logger: req.$logger,
          config: config,
          remoteAddress: req.connection.remoteAddress,
        })
        .then((apiResponse) => {
          if (route.responseHandler) {
            const handler = route.responseHandler.bind(this)(req, res);
            handler.bind(this)(apiResponse);
          } else if (apiResponse) {
            if (typeof apiResponse.pipe === 'function') {
              // if stream pipe it to response
              pipeWithErrors(apiResponse, res);
            } else {
              this.jsonResponseHandler(req, res)(apiResponse);
            }
          } else {
            res.status(204).send();
          }
        })
        .catch((err) => {
          next(err);
        });
    };
    if (route.responseSchema) {
      routeHandler.__open_api_schema__ = route.responseSchema;
    }
    if (route.produces) {
      routeHandler.__open_api_produces__ = route.produces;
    }
    if (route.consumes) {
      routeHandler.__open_api_consumes__ = route.consumes;
    }
    return routeHandler;
  }

  genericAPICall(APIClass, method) {
    return (reqObj, options) => {
      const apiInstance = new APIClass(options);
      return apiInstance[method](reqObj);
    };
  }

  /**
   * jsonResponseHandler sends a json response. This is the default behaviour
   * when no responseHandler is given.
   * @param {Object} req - Express' Request object.
   * @param {Object} res - Express' Response object.
   */
  jsonResponseHandler(req, res) {
    return (response) => {
      res.$sendResponse(200, response);
    };
  }
}

module.exports = AbstractRouter;
