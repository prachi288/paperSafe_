const express = require('express');

const {UserRoutes,AadharCardRoutes,PanCardRoutes,XMarksheetRoutes}= require('./v1/index');

const router = express.Router();

router.use('/v1', UserRoutes);
router.use('/v1', AadharCardRoutes);
router.use('/v1', PanCardRoutes);
router.use('/v1', XMarksheetRoutes)

module.exports = router;