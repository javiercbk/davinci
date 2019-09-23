const anthropometryCreateValidators = require('./anthropometry-create-validators');
const idParamValidator = require('../../../lib/validators/id-param-validators');


const anthropometryEditValidators = [idParamValidator()].concat(anthropometryCreateValidators);

module.exports = anthropometryEditValidators;
