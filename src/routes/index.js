const express = require('express');

const {UserRoutes}= require('./v1/index');

const router = express.Router();

router.use('/v1', UserRoutes);

module.exports = router;