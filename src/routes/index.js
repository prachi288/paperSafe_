const express = require('express');

const {UserRoutes,AadharCardRoutes}= require('./v1/index');

const router = express.Router();

router.use('/v1', UserRoutes);
router.use('/v1', AadharCardRoutes);

module.exports = router;