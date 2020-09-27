const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sexes = ['male', 'female'];
const healthStatuses = ['asymptomatic', 'mild', 'severe', 'critical', 'died', 'recovered', 'invalid'];

const casesStatsSchema = mongoose.Schema(
  {
    caseCode: Number,
    age: Number,
    sex: {
      type: String,
      enum: sexes,
    },
    regionRes: {
      type: String,
      trim: true,
    },
    provRes: {
      type: String,
      trim: true,
    },
    cityMunRes: {
      type: String,
      trim: true,
    },
    healthStatus: {
      type: String,
      enum: healthStatuses,
    },
    regionResGeo: {
      type: String,
      trim: true,
    },
    provResGeo: {
      type: String,
      trim: true,
    },
    cityMunResGeo: {
      type: String,
      trim: true,
    },
    createdAt: Date,
  },
  {
    timestamps: false,
  }
);

// add plugin that converts mongoose to json
casesStatsSchema.plugin(toJSON);
casesStatsSchema.plugin(paginate);

/**
 * @typedef CaseStats
 */
const CasesStats = mongoose.model('CaseStats', casesStatsSchema, 'cases.stats');

module.exports = CasesStats;
