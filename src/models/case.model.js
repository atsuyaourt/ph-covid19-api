const mongoose = require('mongoose');
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
    ageGroup: {
      type: String,
      trim: true,
      lowercase: true,
    },
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
      lowercase: true,
    },
    provRes: {
      type: String,
      trim: true,
      lowercase: true,
    },
    cityMunRes: {
      type: String,
      trim: true,
      lowercase: true,
    },
    cityMuniPSGC: {
      type: String,
      trim: true,
      lowercase: true,
    },
    healthStatus: {
      type: String,
      enum: healthStatuses,
    },
    isQuarantined: Boolean,
    dateOnset: Date,
    isPregnant: Boolean,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    deletedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

// add plugin that converts mongoose to json
caseSchema.plugin(toJSON);
caseSchema.plugin(paginate);

/**
 * @typedef Case
 */
const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
