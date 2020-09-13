const httpStatus = require('http-status');
const { pick } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { caseService } = require('../services');

const getCases = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['caseCode', 'healthStatus']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await caseService.queryCases(filter, options);
  res.send(result);
});

const getCase = catchAsync(async (req, res) => {
  const _case = await caseService.getCaseById(req.params.caseId);
  if (!_case) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Case not found');
  }
  res.send(_case);
});

module.exports = {
  getCases,
  getCase,
};
