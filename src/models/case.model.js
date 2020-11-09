const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const { toJSON, paginate } = require('./plugins');

const sexes = ['male', 'female'];
const removalTypes = ['recovered', 'died', 'duplicate'];
const healthStatuses = ['asymptomatic', 'mild', 'severe', 'critical', 'died', 'recovered', 'invalid'];

const caseSchema = mongoose.Schema(
  {
    caseCode: {
      type: String,
      required: true,
      trim: true,
    },
    age: Number,
    sex: {
      type: String,
      enum: sexes,
    },
    dateSpecimen: Date,
    dateResultRelease: Date,
    dateRepConf: Date,
    dateDied: Date,
    dateRecover: Date,
    removalType: {
      type: String,
      enum: removalTypes,
    },
    isAdmitted: Boolean,
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
    cityMuniPSGC: {
      type: String,
      trim: true,
    },
    barangayRes: {
      type: String,
      trim: true,
    },
    barangayPSGC: {
      type: String,
      trim: true,
    },
    healthStatus: {
      type: String,
      enum: healthStatuses,
    },
    isQuarantined: Boolean,
    dateOnset: Date,
    isPregnant: Boolean,
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
    updatedAt: Date,
    deletedAt: Date,
  },
  {
    timestamps: false,
  }
);

// add plugin that converts mongoose to json
caseSchema.plugin(toJSON);
caseSchema.plugin(paginate);
caseSchema.plugin(aggregatePaginate);

/**
 * @typedef Case
 */
const Case = mongoose.model('Case', caseSchema);

Case.aggregatePaginate.options = {
  limit: 100,
  customLabels: { docs: 'results' },
};

module.exports = Case;
