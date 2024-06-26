const express = require('express');

const { TrainTicketController } = require('../../controller/index');

const router = express.Router();

router.post('/uploadTrainTicket', TrainTicketController.uploadtrainTicket);
router.get('/downloadTrainTicket/:id', TrainTicketController.downloadtrainTicket);
router.delete('/deleteTrainTicket/:id', TrainTicketController.deletetrainTicket);

module.exports = router;