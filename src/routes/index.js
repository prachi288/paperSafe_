const express = require('express');

const {UserRoutes,AadharCardRoutes,PanCardRoutes,XMarksheetRoutes,XIIMarksheetRoutes,MovieTicketRoutes,TrainTicketRoutes}= require('./v1/index');

const router = express.Router();

router.use('/v1', UserRoutes);
router.use('/v1', AadharCardRoutes);
router.use('/v1', PanCardRoutes);
router.use('/v1', XMarksheetRoutes);
router.use('/v1', XIIMarksheetRoutes);
router.use('/v1', MovieTicketRoutes);
router.use('/v1', TrainTicketRoutes);

module.exports = router;