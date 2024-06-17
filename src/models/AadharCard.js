const mongoose = require("mongoose");

const aadhaarSchema = new mongoose.Schema({
    schemaVersion : {
        type: Number,
        default: 1
    },
    imageURL : {
        type: String,
        required: true,
    },
    aadhaarNumber : {
        type: String
    },
    isFavourite : {
        type : Boolean,
        default: false
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

const AadhaarCard = mongoose.model('AadhaarCard', aadhaarSchema);

module.exports = AadhaarCard;