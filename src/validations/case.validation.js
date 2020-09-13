const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const getCases = {
  query: Joi.object().keys({
    caseCode: Joi.string(),
    healthStatus: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCase = {
  params: Joi.object().keys({
    caseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getCases,
  getCase,
};
