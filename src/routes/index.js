const express = require('express');

const {UserRoutes,AadharCardRoutes,PanCardRoutes}= require('./v1/index');

const router = express.Router();

router.use('/v1', UserRoutes);
router.use('/v1', AadharCardRoutes);
router.use('/v1', PanCardRoutes);

module.exports = router;