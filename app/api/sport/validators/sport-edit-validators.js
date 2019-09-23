const sportCreateValidator = require('./sport-create-validators');
const idParamValidator = require('../../../lib/validators/id-param-validators');

const sportEditValidators = [idParamValidator()];

module.exports = sportEditValidators.concat(sportCreateValidator);
