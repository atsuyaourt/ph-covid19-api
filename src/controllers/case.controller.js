const httpStatus = require('http-status');
const { pick } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { caseService } = require('../services');

const getCases = catchAsync(async (req, res) => {
  const filter = {
    deletedAt: {
      $exists: 0,
    },
    ...pick(req.query, ['healthStatus', 'removalType']),
  };
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

const getCasesStats = catchAsync(async (req, res) => {
  const level = 'level' in req.query ? req.query.level : 'provResGeo';
  const filter = {
    deletedAt: {
      $exists: 0,
    },
    ...pick(req.query, ['healthStatus', 'removalType', 'sex', 'regionResGeo', 'provResGeo']),
  };
  const options = pick(req.query, ['limit', 'page']);
  const result = await caseService.queryCasesStats(level, filter, options);
  res.send(result);
});

module.exports = {
  getCases,
  getCase,
  getCasesStats,
};
