const { Case } = require('../models');

/**
 * Query for cases
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCases = async (filter, options) => {
  const cases = await Case.paginate(filter, options);
  return cases;
};

/**
 * Get case by id
 * @param {ObjectId} id
 * @returns {Promise<Case>}
 */
const getCaseById = async (id) => {
  return Case.findById(id);
};

/**
 * Query for case stats
 * @param {string} level - Aggregation level (default = provResGeo)
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCasesStats = async (level, filter, options) => {
  const groupId = {
    regionResGeo: '$regionResGeo',
    provResGeo: '$provResGeo',
    healthStatus: '$healthStatus',
  };
  const project = {
    regionResGeo: '$_id.regionResGeo',
    provResGeo: '$_id.provResGeo',
    healthStatus: '$_id.healthStatus',
    count: 1,
    _id: 0,
  };
  if (level === 'cityMunResGeo') {
    groupId.cityMunResGeo = '$cityMunResGeo';
    project.cityMunResGeo = '$_id.cityMunResGeo';
  }
  const caseAgg = Case.aggregate([
    { $match: filter },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: groupId,
        count: { $sum: 1 },
      },
    },
    { $project: project },
  ]);
  if (Object.keys(options).length === 0) {
    return caseAgg;
  }
  return Case.aggregatePaginate(caseAgg, options);
};

module.exports = {
  queryCases,
  getCaseById,
  queryCasesStats,
};
