const mongoose = require('mongoose');

const movieTicketSchema = new mongoose.Schema({
    schemaVersion : {
        type: Number,
        default: 1
    },
    imageURL: {
        type: String,
        required: true
    },
    isFavourite : {
        type : Boolean,
        default: false
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const MovieTicket = mongoose.model('MovieTicket', movieTicketSchema);

module.exports = MovieTicket;