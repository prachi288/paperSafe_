const express = require('express');

const {upload}=require('../../middleware/index')
const {MovieTicketController}=require('../../controller/index');

const router = express.Router();

console.log("Inside MovieTicket Routes");

router.post('/uploadMovieTicket',upload.single('movieTicket'),MovieTicketController.uploadmovieTicket);
router.get('/downloadMovieTicket/:id',MovieTicketController.downloadmovieTicket);
router.delete('/deleteMovieTicket/:id',MovieTicketController.deletemovieTicket);

module.exports = router;