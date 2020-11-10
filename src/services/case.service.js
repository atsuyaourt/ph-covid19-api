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
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCasesStats = async (filter, options) => {
  // const casesStats = await CasesStats.paginate(filter, options);
  const caseAgg = Case.aggregate([
    { $match: filter },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: {
          regionResGeo: '$regionResGeo',
          provResGeo: '$provResGeo',
          cityMunResGeo: '$cityMunResGeo',
          healthStatus: '$healthStatus',
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        regionResGeo: '$_id.regionResGeo',
        provResGeo: '$_id.provResGeo',
        cityMunResGeo: '$_id.cityMunResGeo',
        healthStatus: '$_id.healthStatus',
        count: 1,
        _id: 0,
      },
    },
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
