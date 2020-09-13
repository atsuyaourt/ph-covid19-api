const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const caseRoute = require('./case.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/cases', caseRoute);
router.use('/docs', docsRoute);

module.exports = router;
